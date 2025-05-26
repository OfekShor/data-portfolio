import os
import shutil
from datetime import datetime

# הגדרות נתיב
script_dir = os.path.dirname(os.path.abspath(__file__))
queries_dir = os.path.join(script_dir, "queries")
target_query_path = os.path.join(script_dir, "query.sql")
log_path = os.path.join(script_dir, "query_log.txt")

# מציאת קבצי שאילתה
query_files = [f for f in os.listdir(queries_dir) if f.endswith(".sql")]

if not query_files:
    print("⚠️ No SQL queries found in 'queries' folder.")
    exit()

# תפריט לבחירה
print("\n📂 Available Queries:")
for i, q in enumerate(query_files):
    print(f"{i + 1}. {q}")

choice = input("\n🔽 Choose a query by number: ")

try:
    index = int(choice) - 1
    selected_file = query_files[index]
except:
    print("❌ Invalid choice.")
    exit()

# העתקת השאילתה לקובץ query.sql
source_path = os.path.join(queries_dir, selected_file)
shutil.copy(source_path, target_query_path)
print(f"\n✅ Selected query: {selected_file} → loaded into query.sql")

# קריאת תוכן השאילתה
with open(source_path, "r") as f:
    selected_query = f.read()

# תיעוד ללוג עם חותמת זמן
timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
log_line = f"{timestamp} | {selected_file}\n{selected_query.strip()}\n{'-' * 60}\n"

with open(log_path, "a") as log_file:
    log_file.write(log_line)

# הפעלת sync_and_export.py
run_now = input("▶️ Run sync_and_export.py now? (y/n): ").lower().strip()
if run_now == "y":
    os.system(f"{os.sys.executable} sync_and_export.py")
