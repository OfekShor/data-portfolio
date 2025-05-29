
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

# שלב 4 – הוספת אחוזי שינוי לקובץ long
print("\n📊 Calculating daily and reference percent changes...")

price_history_long_path = os.path.join(output_dir, "price_history_long.csv")
if os.path.exists(price_history_long_path):
    try:
        df_long = pd.read_csv(price_history_long_path)
        df_long["Date"] = pd.to_datetime(df_long["Date"])
        df_long = df_long.sort_values(by=["Symbol", "Date"])
        df_long["percent_change_daily"] = df_long.groupby("Symbol")["Price"].pct_change() * 100

        reference_date = pd.to_datetime("2025-05-21")
        ref_prices = df_long[df_long["Date"] == reference_date][["Symbol", "Price"]].rename(columns={"Price": "RefPrice"})
        df_long = df_long.merge(ref_prices, on="Symbol", how="left")
        df_long["percent_change_since_2025_05_21"] = ((df_long["Price"] - df_long["RefPrice"]) / df_long["RefPrice"]) * 100
        df_long.drop(columns=["RefPrice"], inplace=True)

        enhanced_path = os.path.join(output_dir, "price_history_long_with_change.csv")
        df_long.to_csv(enhanced_path, index=False)
        print(f"✅ Saved enhanced long-format CSV → {enhanced_path}")
    except Exception as e:
        print(f"❌ Failed to calculate percent changes: {e}")
else:
    print("⚠️  price_history_long.csv not found – skipping percent change calculations.")

conn.close()
print("\n🏁 All done! You can now refresh in Tableau.")
