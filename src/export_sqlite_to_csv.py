import sqlite3
import pandas as pd
import os

# נתיב לקובץ SQLite
db_path = '/Users/ofekshor/metabase-volume/stocks.db'
conn = sqlite3.connect(db_path)

# יצירת תיקיית פלט לקבצים
output_dir = 'csv_exports'
os.makedirs(output_dir, exist_ok=True)

# שליפת כל שמות הטבלאות במסד
tables_query = "SELECT name FROM sqlite_master WHERE type='table';"
tables = pd.read_sql(tables_query, conn)['name'].tolist()

# ייצוא של כל טבלה לקובץ CSV
for table in tables:
    try:
        df = pd.read_sql_query(f'SELECT * FROM "{table}"', conn)
        csv_path = os.path.join(output_dir, f"{table}.csv")
        df.to_csv(csv_path, index=False)
        print(f"✔ Exported {table} to {csv_path}")
    except Exception as e:
        print(f"❌ Failed to export {table}: {e}")

conn.close()
