import gspread
import pandas as pd
import sqlite3
from oauth2client.service_account import ServiceAccountCredentials

# התחברות ל-Google Sheets
scope = [
    "https://spreadsheets.google.com/feeds",
    "https://www.googleapis.com/auth/drive"
]
creds = ServiceAccountCredentials.from_json_keyfile_name("credentials.json", scope)
client = gspread.authorize(creds)

# שם הגיליון והקובץ המקומי של SQLite
spreadsheet_name = "Stock Portfolio Tracking Spreadsheet"
database_name = "../stocks.db"  # מסלול יחסי מתוך src/

spreadsheet = client.open(spreadsheet_name)
sheet_list = spreadsheet.worksheets()

conn = sqlite3.connect(database_name)

for sheet in sheet_list:
    name = sheet.title.lower().replace(" ", "_").replace("-", "_")
    print(f"\n📄 Loading the sheet : {sheet.title}")

    # שליפת כל הערכים כולל שורות ריקות
    values = sheet.get_all_values()
    
    if len(values) < 2:
        print(f"⚠️  דילוג על {sheet.title} – No Data")
        continue

    headers = values[0]
    rows = values[1:]

    # יצירת DataFrame
    df = pd.DataFrame(rows, columns=headers)

    # ניקוי שמות עמודות
    df.columns = [col.strip() for col in df.columns]

    # המרה למספרים – רק אם אפשר
    df = df.apply(pd.to_numeric, errors='ignore')

    # המרת עמודת Date אם קיימת
    if 'Date' in df.columns:
        df['Date'] = pd.to_datetime(df['Date'], errors='coerce')

    # בדיקה אם יש עמודת כותרת ריקה
    if any(col == "" for col in df.columns):
        print(f"⚠️  Skip {sheet.title} – One Empty title")
        continue

    # שמירה למסד הנתונים
    try:
        df.to_sql(name, conn, if_exists="replace", index=False)
        print(f"✅ Save As Table: {name} ({len(df)} Lines)")
    except Exception as e:
        print(f"❌ Error on saving {sheet.title}: {e}")

conn.close()
print("\n🏁 Sync complete")
