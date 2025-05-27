import React from "react";

export default function Home() {
  return (
    <section className="bg-white py-20 px-6">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
          Automated Data Pipeline for Stocks & Sales
        </h1>
        <p className="text-lg text-gray-700 mb-8">
          A full-stack project that syncs financial data from Google Sheets, stores it in a local SQLite database, exports clean CSVs, and delivers visual insights using Tableau dashboards.
        </p>
        <a
          href="https://public.tableau.com/app/profile/ofek.shor"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition"
        >
          View Dashboards on Tableau
        </a>
      </div>

      <div className="max-w-4xl mx-auto mt-16 text-left">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          🔍 Key Features
        </h2>
        <ul className="list-disc list-inside text-gray-700 text-base space-y-2">
          <li>Real-time synchronization from Google Sheets</li>
          <li>Structured storage with SQLite</li>
          <li>Automated export of tables to CSV</li>
          <li>Data visualization with Tableau Public</li>
        </ul>
      </div>
    </section>
  );
}
