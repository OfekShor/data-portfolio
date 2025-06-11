import React from "react";

export default function Visuals() {
  return (
    <section className="pt-24 bg-white px-6">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">
          📊 Data Visualizations with Tableau Public
        </h1>

        <p className="text-lg text-gray-700 mb-4">
          A snapshot of stock behavior using query-driven data analysis. This
          visualization shows the daily percent change across selected stocks.
        </p>

        <p className="text-sm text-gray-600 italic mb-8">
          Tip: Click the button below to explore the live interactive version.
        </p>

        <div className="w-full flex justify-center mb-8">
          <img
            src={process.env.PUBLIC_URL + "/Symbolscreenshot.png"}
            alt="Stock Trends Dashboard Preview"
            className="rounded shadow max-w-full h-auto border"
          />
        </div>

        <a
          href="https://public.tableau.com/views/symbolandtrends/symbolandtrends"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-4 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold shadow hover:bg-blue-700 transition"
        >
          🔗 View Full Interactive Dashboard
        </a>
      </div>
    </section>
  );
}
