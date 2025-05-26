import gspread
import pandas as pd
import sqlite3
from oauth2client.service_account import ServiceAccountCredentials

# התחברות לחשבון Google
scope = ["https://spreadsheets.google.com/feeds", "https://www.googleapis.com/auth/drive"]
creds = ServiceAccountCredentials.from_json_keyfile_name("credentials.json", scope)
client = gspread.authorize(creds)

# פתיחת הקובץ
spreadsheet = client.open("Stock Portfolio Tracking Spreadsheet")

# התחברות למסד הנתונים
conn = sqlite3.connect("stocks.db")

# מעבר על כל הגיליונות
print("📄 גיליונות זמינים בקובץ:")
for sheet in spreadsheet.worksheets():
    title = sheet.title
    print(f" - טוען את הגיליון: {title}")

    # קריאת הנתונים
    data = sheet.get_all_records()
    df = pd.DataFrame(data)

    # דילוג אם הדאטה ריק
    if df.empty or not all(df.columns):
        print(f"   ⚠️ דילוג על {title} – אין כותרות או שורות")
        continue

    # ניקוי שם גיליון לשם טבלה תקני
    table_name = title.strip().lower().replace(" ", "_")

    # שמירה למסד
    try:
        df.to_sql(table_name, conn, if_exists="replace", index=False)
        print(f"   ✅ שמור כטבלה: {table_name} ({len(df)} שורות)")
    except Exception as e:
        print(f"   ❌ שגיאה בשמירת {title}: {e}")

conn.close()
print("🏁 הסתיים.")
