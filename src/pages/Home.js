import React from "react";

export default function Home() {
  return (
    <div className="px-6 py-16 max-w-4xl mx-auto font-sans">
      <h1 className="text-5xl font-extrabold mb-6 text-gray-900 leading-tight">
        Automated Data Analysis Pipeline for Stocks & Sales
      </h1>

      <p className="text-lg text-gray-700 mb-10">
        Welcome to my data portfolio – a showcase of a custom-built ETL pipeline
        that connects Google Sheets with a local SQLite database, exports structured
        data to CSV, and delivers powerful visualizations using Tableau Public.
      </p>

      <h2 className="text-2xl font-semibold mb-4 text-gray-800">
        🔍 What this project includes
      </h2>

      <ul className="list-disc list-inside text-gray-700 text-base mb-8 space-y-2">
        <li>Fetch and sync real-time data from Google Sheets</li>
        <li>Store data in a normalized SQLite database</li>
        <li>Export clean CSV files for flexible use</li>
        <li>Create dynamic visual dashboards with Tableau</li>
      </ul>

      <p className="text-base text-gray-700">
        👉 Explore live dashboards on{" "}
        <a
          href="https://public.tableau.com/app/profile/ofek.shor"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline font-semibold"
        >
          Tableau Public
        </a>
        .
      </p>
    </div>
  );
}
