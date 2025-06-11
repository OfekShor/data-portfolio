import React from "react";

export default function Home() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section
      className="min-h-screen bg-no-repeat bg-cover bg-center py-20 px-6"
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL}/images/homepage-background.png)`,
      }}
    >
      {/* Title Section */}
      <div className="bg-white/90 max-w-5xl mx-auto text-center rounded-xl p-10 shadow-xl">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">
          Data & Product Analyst Portfolio
        </h1>
        <p className="text-base text-gray-700">
          Hi, I'm Ofek Shor. This portfolio showcases a real-time data pipeline — syncing from Google Sheets,
          storing in SQLite, and exporting clean data for analysis and visualization.
        </p>
      </div>

      {/* Pipeline Diagram */}
      <div className="bg-white/90 max-w-4xl mx-auto mt-20 rounded-xl shadow-xl p-4">
        <img
          src={`${process.env.PUBLIC_URL}/images/data-pipeline-chart.png`}
          alt="Automated Data Pipeline"
          className="mx-auto rounded-lg shadow-md w-full max-w-3xl h-auto"
        />
      </div>

      {/* Tools Section */}
      <div className="bg-white/90 max-w-4xl mx-auto mt-16 rounded-xl p-8 shadow-lg">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">🛠 Tools & Features</h2>
        <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
          <li>Sync from Google Sheets</li>
          <li>Store with SQLite</li>
          <li>Export to CSV</li>
          <li>Analyze & visualize results</li>
        </ul>
      </div>

      {/* Scroll to Top Button */}
      <div className="flex justify-center mt-12 mb-20">
        <button
          onClick={scrollToTop}
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-full shadow transition"
        >
          ↑ Back to Top
        </button>
      </div>
    </section>
  );
}
