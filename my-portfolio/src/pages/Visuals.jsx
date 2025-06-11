import React from "react";

export default function Visuals() {
  return (
    <section className="bg-white py-20 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">
          📊 Interactive Data Visualizations
        </h1>

        <p className="text-lg text-gray-700 mb-4">
          Discover trends and insights using real-time visual dashboards powered by Tableau Public.
          The charts are based on live queries from your SQLite database.
        </p>

        <p className="text-sm text-gray-600 italic mb-8">
          Tip: Click below to explore the full interactive dashboard including filters and KPIs.
        </p>

        <div className="w-full flex justify-center mb-10">
          <img
            src={`${process.env.PUBLIC_URL}/Symbolscreenshot.png`}
            alt="Stock Trends Dashboard Preview"
            className="rounded-lg shadow-lg max-w-full h-auto border"
          />
        </div>

        <a
          href="https://public.tableau.com/views/symbolandtrends/symbolandtrends"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-full font-semibold shadow-md hover:bg-blue-700 transition"
        >
          🔗 View Full Dashboard
        </a>
      </div>
    </section>
  );
}
