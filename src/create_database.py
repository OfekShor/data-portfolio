import sqlite3

# יצירת חיבור למסד הנתונים (קובץ חדש בשם stocks.db)
conn = sqlite3.connect('stocks.db')
cursor = conn.cursor()

# יצירת טבלה
cursor.execute("""
CREATE TABLE IF NOT EXISTS stocks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    symbol TEXT,
    price REAL,
    volume INTEGER,
    change_percent REAL,
    date TEXT
)
""")

# דוגמת הכנסת נתון
cursor.execute("""
INSERT INTO stocks (symbol, price, volume, change_percent, date)
VALUES ('AAPL', 175.64, 98200000, -0.85, DATE('now'))
""")

conn.commit()
conn.close()
