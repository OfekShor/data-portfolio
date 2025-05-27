import React, { useEffect, useRef } from "react";

export default function Visuals() {
  const containerRef = useRef(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://public.tableau.com/javascripts/api/viz_v1.js";
    script.async = true;
    containerRef.current.appendChild(script);
  }, []);

  return (
    <section className="bg-white py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">
          Data Visualizations with Tableau Public
        </h1>

        <p className="text-lg text-gray-700 mb-8">
          Interactive dashboards were built using Tableau Public to provide clear insights into stock behavior, portfolio performance, and dynamic query results.
        </p>

        <div className="mb-10 space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">📊 Dashboards include:</h2>
          <ul className="list-disc list-inside text-gray-700 text-base space-y-1">
            <li>Daily stock price trends</li>
            <li>Query-driven results based on selected filters</li>
            <li>Portfolio summaries and performance breakdowns</li>
          </ul>
        </div>

        <p className="text-base text-gray-700 mb-4">
          👉 Explore all dashboards on{" "}
          <a
            href="https://public.tableau.com/app/profile/ofek.shor"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline font-semibold"
          >
            Tableau Public
          </a>.
        </p>

        <div ref={containerRef}>
          <div
            className="tableauPlaceholder border rounded-lg overflow-hidden shadow"
            id="viz1748340651321"
            style={{ position: "relative", width: "100%", height: "800px" }}
          >
            <noscript>
              <a href="#">
                <img
                  alt="Symbol Percent Change (Daily)"
                  src="https://public.tableau.com/static/images/pr/priceandpercent-daily/percentchange/1_rss.png"
                  style={{ border: "none" }}
                />
              </a>
            </noscript>
            <object className="tableauViz" style={{ display: "none" }}>
              <param name="host_url" value="https%3A%2F%2Fpublic.tableau.com%2F" />
              <param name="embed_code_version" value="3" />
              <param name="site_root" value="" />
              <param name="name" value="priceandpercent-daily/percentchange" />
              <param name="tabs" value="no" />
              <param name="toolbar" value="yes" />
              <param name="static_image" value="https://public.tableau.com/static/images/pr/priceandpercent-daily/percentchange/1.png" />
              <param name="animate_transition" value="yes" />
              <param name="display_static_image" value="yes" />
              <param name="display_spinner" value="yes" />
              <param name="display_overlay" value="yes" />
              <param name="display_count" value="yes" />
              <param name="language" value="en-US" />
            </object>
          </div>
        </div>
      </div>
    </section>
  );
}
