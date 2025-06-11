import gspread
import pandas as pd
import sqlite3
import os
from datetime import datetime
from oauth2client.service_account import ServiceAccountCredentials

# התחברות ל-Google Sheets
scope = [
    "https://spreadsheets.google.com/feeds",
    "https://www.googleapis.com/auth/drive"
]

# מציאת הנתיב לקובץ credentials.json (תומך גם בסביבת Render)
credentials_path = os.path.join(os.path.dirname(__file__), "credentials.json")
if not os.path.exists(credentials_path):
    credentials_path = os.path.join(os.path.dirname(__file__), "../backend/credentials.json")

creds = ServiceAccountCredentials.from_json_keyfile_name(credentials_path, scope)
client = gspread.authorize(creds)

# פתיחת הגיליון והכנת מסד נתונים
spreadsheet_name = "Stock Portfolio Tracking Spreadsheet"
database_name = os.path.join(os.path.dirname(__file__), "../stocks.db")
spreadsheet = client.open(spreadsheet_name)
sheet_list = spreadsheet.worksheets()

conn = sqlite3.connect(database_name)

# יצירת תיקיית CSV בתוך my-portfolio
csv_folder = os.path.join(os.path.dirname(__file__), "../csv_exports")
os.makedirs(csv_folder, exist_ok=True)

def safe_to_numeric(x):
    try:
        return pd.to_numeric(x)
    except:
        return x

for sheet in sheet_list:
    name = sheet.title.lower().replace(" ", "_").replace("-", "_")
    print(f"\n📄 Loading the sheet : {sheet.title}")

    values = sheet.get_all_values()
    if len(values) < 2:
        print(f"⚠️  דילוג על {sheet.title} – No Data")
        continue

    headers = values[0]
    rows = values[1:]
    df = pd.DataFrame(rows, columns=headers)
    df.columns = [col.strip() for col in df.columns]

    print(f"📌 Columns in sheet '{sheet.title}': {df.columns.tolist()}")

    if "" in df.columns:
        print(f"⚠️  דילוג על {sheet.title} – עמודה בלי שם")
        continue

    df = df.apply(safe_to_numeric)

    if 'Date' in df.columns:
        df['Date'] = pd.to_datetime(df['Date'], errors='coerce')
        df['Date'] = df['Date'].dt.strftime('%Y-%m-%d')

    if sheet.title == "Price_History":
        print("🔄 זיהוי פורמט...")

        if set(df.columns) >= {"Date", "Symbol", "Price"}:
            print("⚠️ פורמט long קיים – דילוג על המרה")
            df_long = df.copy()
        else:
            print("🔁 המרה מ־wide ל־long format")
            df_long = pd.melt(df, id_vars=["Date"], var_name="Symbol", value_name="Price")

        df_long = df_long.dropna(subset=["Date", "Symbol", "Price"])
        df_long["Price"] = pd.to_numeric(df_long["Price"], errors="coerce")
        df_long["Date"] = pd.to_datetime(df_long["Date"], errors="coerce").dt.strftime('%Y-%m-%d')

        df_long = df_long.drop_duplicates(subset=["Symbol", "Date"])
        df_long = df_long.sort_values(by=["Symbol", "Date"])

        df_long["Percent Change"] = df_long.groupby("Symbol")["Price"].pct_change() * 100
        df_long["Percent Change"] = df_long["Percent Change"].round(2)

        df_long.to_sql(name, conn, if_exists="replace", index=False)
        print(f"✅ Save Long Table: {name} ({len(df_long)} Lines)")

        csv_path = os.path.join(csv_folder, f"{name}.csv")
        df_long.to_csv(csv_path, index=False)
        print(f"💾 CSV saved to: {csv_path}")

        sheet.clear()
        sheet.update([df_long.columns.tolist()] + df_long.astype(str).values.tolist())
        print("🔁 Google Sheet updated with long-format + Percent Change")
        continue

    if all(col in df.columns for col in ['Symbol', 'Price', 'Date']):
        df = df.dropna(subset=["Symbol", "Price", "Date"])
        df = df.sort_values(by=['Symbol', 'Date'])
        df['Percent Change'] = df.groupby('Symbol')['Price'].pct_change() * 100
        df['Percent Change'] = df['Percent Change'].round(2)

    try:
        df.to_sql(name, conn, if_exists="replace", index=False)
        print(f"✅ Save As Table: {name} ({len(df)} Lines)")

        csv_path = os.path.join(csv_folder, f"{name}.csv")
        df.to_csv(csv_path, index=False)
        print(f"💾 CSV saved to: {csv_path}")

    except Exception as e:
        print(f"❌ Error on saving {sheet.title}: {e}")

conn.close()
print(f"\n🏁 Sync complete at {datetime.now().isoformat()}")
