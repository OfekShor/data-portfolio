import React from "react";

export default function Exports() {
  return (
    <section className="bg-white py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">
          CSV Exports from the SQLite Database
        </h1>
        <p className="text-lg text-gray-700 mb-8">
          As part of the automated pipeline, each table from the SQLite database is exported to a CSV file using Python scripts. These exports serve as the foundation for analysis and visualization in Tableau.
        </p>

        <div className="space-y-6 text-gray-800">
          <div>
            <h2 className="text-xl font-semibold mb-1">📁 Directory</h2>
            <p className="text-base text-gray-600">
              All CSV exports are saved to <code className="bg-gray-100 px-2 py-1 rounded text-sm">/src/csv_exports</code>
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-1">📄 query_result.csv</h2>
            <p className="text-base text-gray-600">
              Contains the latest output of the main SQL query used for Tableau dashboards.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-1">📄 price_history.csv</h2>
            <p className="text-base text-gray-600">
              Long-format table including daily and reference-based percent change – used for time-series visualizations and trend analysis.
            </p>
          </div>

          <div>
            <p className="text-base text-gray-600 italic">
              CSV files are refreshed daily to ensure up-to-date insights across all platforms.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
