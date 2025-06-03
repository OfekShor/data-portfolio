import React from "react";

export default function Home() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section
      className="min-h-screen bg-cover bg-center py-20 px-6"
      style={{ backgroundImage: "url('/images/homepage-background.png')" }}
    >
      <div className="bg-white/90 max-w-5xl mx-auto text-center rounded-xl p-10 shadow-xl">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">
          Data & Product Analyst Portfolio
        </h1>
        <p className="text-base text-gray-700 mb-8">
          Hi, I'm Ofek Shor. This portfolio highlights projects that combine data automation, storage, and insights — built with Python, SQLite, Google Sheets, and Tableau.
        </p>
        <a
          href="https://public.tableau.com/app/profile/ofek.shor"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition"
        >
          View Tableau Dashboards
        </a>
      </div>

      <div className="bg-white/90 max-w-4xl mx-auto mt-16 rounded-xl p-8 shadow-lg">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">🔧 Tools & Features</h2>
        <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
          <li>Sync from Google Sheets</li>
          <li>Store with SQLite</li>
          <li>Export to CSV</li>
          <li>Visualize in Tableau</li>
        </ul>
      </div>

      <div className="bg-white/90 max-w-5xl mx-auto mt-20 text-center rounded-xl p-10 shadow-xl">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Workflow</h2>
        <img
          src="/images/data-pipeline-chart.png"
          alt="System Workflow"
          className="mx-auto rounded shadow-md max-w-full h-auto"
        />
      </div>

      <div className="flex justify-center mt-12">
        <button
          onClick={scrollToTop}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-full shadow transition"
        >
          ↑ Back to Top
        </button>
      </div>
    </section>
  );
}
