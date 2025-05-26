import os
import subprocess
import sqlite3
import pandas as pd
import sys

# שלב 1 – סנכרון מהשיטס
print("🔄 Running sync from Google Sheets to stocks.db ...")

script_dir = os.path.dirname(os.path.abspath(__file__))
sync_script = os.path.join(script_dir, "sync_sheet_to_sql.py")
subprocess.run([sys.executable, sync_script], check=True)

print("✅ Sync completed.\n")

# שלב 2 – ייצוא טבלאות ל-CSV
print("📤 Exporting tables to CSV...")

db_path = os.path.join(script_dir, "../stocks.db")
conn = sqlite3.connect(db_path)
output_dir = os.path.join(script_dir, "csv_exports")
os.makedirs(output_dir, exist_ok=True)

tables_to_melt = ['price_history']

tables_query = "SELECT name FROM sqlite_master WHERE type='table';"
tables = pd.read_sql(tables_query, conn)['name'].tolist()

for table in tables:
    try:
        df = pd.read_sql_query(f'SELECT * FROM "{table}"', conn)
        csv_path = os.path.join(output_dir, f"{table}.csv")
        df.to_csv(csv_path, index=False)
        print(f"✔ Exported {table} → {csv_path}")

        # המרה לפורמט long (וגם שמירה למסד הנתונים)
        if table in tables_to_melt and 'Date' in df.columns:
            df_melted = df.melt(id_vars=['Date'], var_name='Symbol', value_name='Price')
            melt_table_name = f"{table}_long"
            melt_path = os.path.join(output_dir, f"{melt_table_name}.csv")
            df_melted.to_csv(melt_path, index=False)
            df_melted.to_sql(melt_table_name, conn, if_exists='replace', index=False)
            print(f"  🔁 Transformed {table} → {melt_table_name}.csv (and saved to DB)")

    except Exception as e:
        print(f"❌ Failed to export {table}: {e}")

# שלב 3 – הרצת שאילתה מותאמת מתוך query.sql
print("\n🧠 Running custom SQL query from query.sql...")

query_file_path = os.path.join(script_dir, "query.sql")
query_output_path = os.path.join(output_dir, "query_result.csv")

if os.path.exists(query_file_path):
    with open(query_file_path, "r") as f:
        query = f.read()
        print(f"\n🔍 Executing SQL:\n{query}\n")

    try:
        df_query = pd.read_sql_query(query, conn)
        df_query.to_csv(query_output_path, index=False)
        print(f"✅ Exported query result → {query_output_path}")
    except Exception as e:
        print(f"❌ Failed to run query from query.sql: {e}")
else:
    print("⚠️  No query.sql file found – skipping custom query export.")

conn.close()
print("\n🏁 All done! You can now refresh in Tableau.")
