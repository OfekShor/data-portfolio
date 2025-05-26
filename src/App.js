import React from "react";
import "./App.css";
import ProjectCard from "./ProjectCard";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Ofek Shor – Data Analyst Portfolio</h1>
        <p>Welcome to my portfolio...</p>
      </header>

      <main>
        <ProjectCard
          title="Sales Analysis with SQL + Sheets"
          description="Pulled sales data using SQL queries, processed it in Google Sheets, and visualized key KPIs in Tableau."
          sheetLink="https://docs.google.com/spreadsheets/d/YOUR-SHEET-ID"
          dashboardLink="https://public.tableau.com/views/YOUR-DASHBOARD-ID"
        />
      </main>
    </div>
  );
}

export default App;
