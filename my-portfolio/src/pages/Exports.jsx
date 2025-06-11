import React from "react";

export default function Exports() {
  return (
    <section className="pt-24 bg-white px-6">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">
          📤 Clean Data Exports
        </h1>

        <p className="text-lg text-gray-700 mb-4">
          The pipeline automatically exports SQLite tables into clean CSV files,
          ready for analysis and visualization. These datasets are the building blocks
          for our insights.
        </p>

        <p className="text-sm text-gray-600 italic mb-10">
          Updated daily from Google Sheets to ensure accuracy and continuity.
        </p>

        <div className="grid md:grid-cols-2 gap-8 text-left max-w-4xl mx-auto">
          <div className="bg-gray-50 rounded-xl p-6 shadow">
            <h2 className="text-xl font-semibold mb-2">📄 query_results.csv</h2>
            <p className="text-sm text-gray-600 mb-4">
              Final output of the main SQL query used for visual dashboards.
            </p>
            <code className="bg-gray-100 px-2 py-1 rounded text-xs text-gray-700">
              /src/csv_exports/query_results.csv
            </code>
          </div>

          <div className="bg-gray-50 rounded-xl p-6 shadow">
            <h2 className="text-xl font-semibold mb-2">📄 price_history.csv</h2>
            <p className="text-sm text-gray-600 mb-4">
              Long-format table with daily price and percent change by symbol —
              used for time-series and trend analytics.
            </p>
            <code className="bg-gray-100 px-2 py-1 rounded text-xs text-gray-700">
              /src/csv_exports/price_history.csv
            </code>
          </div>
        </div>

        <div className="mt-10">
          <a
            href={`${process.env.PUBLIC_URL}/sample_exports.zip`}
            download
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-full font-semibold shadow-md hover:bg-blue-700 transition"
          >
            ⬇️ Download Sample CSVs
          </a>
        </div>
      </div>
    </section>
  );
}
