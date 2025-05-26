import React from "react";

export default function Exports() {
  return (
    <div>
      <h1>CSV Exports</h1>
      <p>Each table in the SQLite database is exported to a CSV file daily using Python.</p>
      <ul>
        <li>Exports located in <code>/src/csv_exports</code></li>
        <li>Long-format tables available for time-series use</li>
        <li>Latest query result saved as <code>query_result.csv</code></li>
      </ul>
    </div>
  );
}