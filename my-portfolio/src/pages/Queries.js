import React from "react";

export default function Queries() {
  return (
    <section className="bg-white py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">
          SQL Queries Used in the Project
        </h1>
        <p className="text-lg text-gray-700 mb-8">
          This section includes the key SQL queries that were used to extract, transform, and export data. These queries power the dashboards and CSV exports throughout the system.
        </p>

        <div className="space-y-6 text-gray-800">
          <div>
            <h2 className="text-xl font-semibold mb-1">📄 <code className="bg-gray-100 px-2 py-1 rounded text-sm">price_aapl.sql</code></h2>
            <p className="text-base text-gray-600">
              Displays historical daily prices for Apple Inc. (AAPL) from the <code>price_history</code> table.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-1">📄 <code className="bg-gray-100 px-2 py-1 rounded text-sm">query.sql</code></h2>
            <p className="text-base text-gray-600">
              Main aggregated query used for Tableau visualization, combining portfolio performance and latest price data.
            </p>
          </div>

          <div>
            <p className="text-base text-gray-600 italic">
              All SQL files are located in <code className="bg-gray-100 px-2 py-1 rounded text-sm">/src/queries</code>.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
