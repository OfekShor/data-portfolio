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

# שלב 2 – ניקוי קבצי CSV ישנים
print("🧹 Cleaning old CSV files...")
output_dir = os.path.join(script_dir, "csv_exports")
os.makedirs(output_dir, exist_ok=True)

for fname in os.listdir(output_dir):
    if fname.endswith(".csv"):
        os.remove(os.path.join(output_dir, fname))
print("✅ Old CSV files removed.\n")

# שלב 3 – ייצוא טבלאות למסד ול־CSV
print("📤 Exporting tables to CSV...")

db_path = os.path.join(script_dir, "../stocks.db")
conn = sqlite3.connect(db_path)

# מחיקת טבלה ישנה אם קיימת
conn.execute("DROP TABLE IF EXISTS price_history_long;")

tables_query = "SELECT name FROM sqlite_master WHERE type='table';"
tables = pd.read_sql(tables_query, conn)['name'].tolist()
exported_files = set()

for table in tables:
    try:
        df = pd.read_sql_query(f'SELECT * FROM "{table}"', conn)

        if table == "price_history" and 'Date' in df.columns:
            # המרה ל-long format
            df_long = df.melt(id_vars=["Date"], var_name="Symbol", value_name="Price")
            df_long["Date"] = pd.to_datetime(df_long["Date"])
            df_long = df_long.sort_values(by=["Symbol", "Date"])
            df_long["percent_change_daily"] = df_long.groupby("Symbol")["Price"].pct_change() * 100

            # קריאה דינמית של תאריך רפרנס
            ref_date_file = os.path.join(script_dir, "reference_date.txt")
            reference_date = None
            if os.path.exists(ref_date_file):
                with open(ref_date_file, "r") as f:
                    reference_date_str = f.read().strip()
                try:
                    reference_date = pd.to_datetime(reference_date_str)
                    ref_prices = df_long[df_long["Date"] == reference_date][["Symbol", "Price"]].rename(columns={"Price": "RefPrice"})
                    df_long = df_long.merge(ref_prices, on="Symbol", how="left")
                    df_long["percent_change_since_reference"] = ((df_long["Price"] - df_long["RefPrice"]) / df_long["RefPrice"]) * 100
                    df_long.drop(columns=["RefPrice"], inplace=True)
                    print(f"📆 Calculated percent change since {reference_date.date()}")
                except Exception as e:
                    print(f"❌ Failed to parse reference date: {e}")

            df_long.to_csv(os.path.join(output_dir, "price_history.csv"), index=False)
            df_long.to_sql("price_history", conn, if_exists="replace", index=False)
            print(f"  🔁 Enhanced and saved price_history with percent changes.")
        else:
            csv_name = f"{table}.csv"
            if csv_name in exported_files:
                print(f"⚠️ Skipped duplicate export for {csv_name}")
                continue

            df.to_csv(os.path.join(output_dir, csv_name), index=False)
            exported_files.add(csv_name)
            print(f"✔ Exported {table} → {csv_name}")
    except Exception as e:
        print(f"❌ Failed to export {table}: {e}")

# שלב 4 – הרצת שאילתה מותאמת מתוך query.sql
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

# סיום
conn.close()
print("\n🏁 All done! You can now refresh in Tableau.")
