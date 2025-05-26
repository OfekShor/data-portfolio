import React from "react";

export default function Home() {
  return (
    <div>
      <h1>Welcome to the Data Portfolio</h1>
      <p>This portfolio demonstrates a full data pipeline:</p>
      <ul>
        <li>Sync data from Google Sheets</li>
        <li>Store it in a SQLite database</li>
        <li>Export selected tables to CSV</li>
        <li>Visualize everything using Tableau</li>
      </ul>
    </div>
  );
}
