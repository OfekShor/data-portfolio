import gspread
import pandas as pd
import sqlite3
from oauth2client.service_account import ServiceAccountCredentials

# התחברות לחשבון Google עם credentials
scope = ["https://spreadsheets.google.com/feeds", "https://www.googleapis.com/auth/drive"]
creds = ServiceAccountCredentials.from_json_keyfile_name("credentials.json", scope)
client = gspread.authorize(creds)

# הדפסת כל הגיליונות שהחשבון רואה
print("📄 גיליונות זמינים:")
files = client.list_spreadsheet_files()
for f in files:
    print(" -", f["name"])

# פתיחת הגיליון לפי השם שאתה רואה למעלה בדיוק
sheet = client.open("Stock Portfolio Tracking Spreadsheet").sheet1

# משיכת נתונים
data = sheet.get_all_records()
df = pd.DataFrame(data)

print("\n📊 נתונים מהגיליון:")
print(df)

# שמירה למסד SQLite
conn = sqlite3.connect("stocks.db")
df.to_sql("stocks", conn, if_exists="append", index=False)
print("\n✅ הנתונים נשמרו לקובץ stocks.db")

# ביצוע שאילתה
result = pd.read_sql_query("""
    SELECT 
        symbol, 
        ROUND(AVG(price), 2) AS avg_price,
        SUM(volume) AS total_volume,
        COUNT(*) AS num_rows
    FROM stocks
    GROUP BY symbol
    ORDER BY avg_price DESC
""", conn)

print("\n📈 סיכום נתונים לפי מניה:")
print(result)

conn.close()
