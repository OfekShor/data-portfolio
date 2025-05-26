from flask import Flask
import subprocess

app = Flask(__name__)

@app.route("/run-fetch")
def run_fetch():
    result = subprocess.run(
        ["/Users/ofekshor/Documents/data-portfolio/venv/bin/python", "src/sync_sheet_to_sql.py"],
        capture_output=True,
        text=True
    )
    return f"<pre>{result.stdout or result.stderr}</pre>"

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5050)
