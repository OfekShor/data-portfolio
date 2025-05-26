import sqlite3
import csv

conn = sqlite3.connect("sales.db")
cursor = conn.cursor()

cursor.execute("SELECT * FROM sales")
rows = cursor.fetchall()

with open("sales.csv", "w", newline="") as f:
    writer = csv.writer(f)
    writer.writerow(["id", "region", "product", "quantity", "revenue"])
    writer.writerows(rows)

conn.close()
