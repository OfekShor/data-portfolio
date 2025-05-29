import React, { useEffect, useRef } from "react";

export default function Visuals() {
  const vizRef = useRef(null);

  useEffect(() => {
    const container = vizRef.current;

    const script = document.createElement("script");
    script.src = "https://public.tableau.com/javascripts/api/viz_v1.js";
    script.async = true;

    script.onload = () => {
      const vizElement = container.querySelector("object");
      if (vizElement) {
        vizElement.style.width = "100%";
        vizElement.style.height = (container.offsetWidth * 0.75) + "px";
        vizElement.style.display = "block";
      }
    };

    container.appendChild(script);

    // רענון נוסף לאחר השהייה
    setTimeout(() => {
      const vizElement = container.querySelector("object");
      if (vizElement) {
        vizElement.style.width = "100%";
        vizElement.style.height = (container.offsetWidth * 0.75) + "px";
        vizElement.style.display = "block";
      }
    }, 2000);
  }, []);

  return (
    <section className="bg-white py-20 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">
          Data Visualizations with Tableau Public
        </h1>

        <p className="text-lg text-gray-700 mb-4">
          A snapshot of stock behavior using query-driven data analysis. This
          visualization shows the daily percent change across selected stocks.
        </p>

        <p className="text-sm text-gray-600 italic mb-8">
          Tip: Click on a dot to view the daily percent change for each stock.
        </p>

        <div
          className="tableauPlaceholder w-full"
          id="viz1748524069904"
          ref={vizRef}
          style={{ position: "relative", minHeight: "800px" }}
        >
          <noscript>
            <a href="#">
              <img
                alt="symbol and trends"
                src="https://public.tableau.com/static/images/sy/symbolandtrends/symbolandtrends/1_rss.png"
                style={{ border: "none" }}
              />
            </a>
          </noscript>
          <object className="tableauViz" style={{ display: "none" }}>
            <param name="host_url" value="https%3A%2F%2Fpublic.tableau.com%2F" />
            <param name="embed_code_version" value="3" />
            <param name="site_root" value="" />
            <param name="name" value="symbolandtrends/symbolandtrends" />
            <param name="tabs" value="no" />
            <param name="toolbar" value="yes" />
            <param
              name="static_image"
              value="https://public.tableau.com/static/images/sy/symbolandtrends/symbolandtrends/1.png"
            />
            <param name="animate_transition" value="yes" />
            <param name="display_static_image" value="yes" />
            <param name="display_spinner" value="yes" />
            <param name="display_overlay" value="yes" />
            <param name="display_count" value="yes" />
            <param name="language" value="en-US" />
            <param name="filter" value="publish=yes" />
          </object>
        </div>

        <a
          href="https://public.tableau.com/views/symbolandtrends/symbolandtrends"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-10 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold shadow hover:bg-blue-700 transition"
        >
          🔗 View Full Interactive Dashboard
        </a>
      </div>
    </section>
  );
}
