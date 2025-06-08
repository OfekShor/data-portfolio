import sqlite3
import pandas as pd
import os

# הגדרת נתיב למסד הנתונים
db_path = os.path.join(os.path.dirname(__file__), "../stocks.db")

# פתיחת החיבור
conn = sqlite3.connect(db_path)

# קריאת השאילתה מתוך הקובץ
with open("query.sql", "r") as f:
    query = f.read()

# הרצת השאילתה
df = pd.read_sql_query(query, conn)

# שמירת התוצאה כ-CSV
output_path = os.path.join(os.path.dirname(__file__), "../csv_exports/query_results.csv")
df.to_csv(output_path, index=False)

print(f"✅ Query ran successfully. Saved to: {output_path}")
conn.close()

print(df.head())


