import React, { useEffect, useRef } from "react";

export default function TableauEmbed({ url, height = 800 }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;

    // טוען את סקריפט Tableau
    const script = document.createElement("script");
    script.src = "https://public.tableau.com/javascripts/api/viz_v1.js";
    script.async = true;
    container.appendChild(script);

    // ברגע שה־object נוסף לדף – נשנה לו את הגובה
    const observer = new MutationObserver(() => {
      const vizElement = container.querySelector("object");
      if (vizElement) {
        vizElement.style.width = "100%";
        vizElement.style.minHeight = `${height}px`;
        vizElement.style.display = "block";
      }
    });

    observer.observe(container, { childList: true, subtree: true });

    // ניקוי זיכרון
    return () => {
      observer.disconnect();
    };
  }, [url, height]);

  return (
    <div
      ref={containerRef}
      className="w-full"
      style={{ minHeight: `${height}px`, overflow: "hidden" }}
    >
      <noscript>
        <a href={url}>
          <img
            alt="Tableau Dashboard"
            src={`${url}/1.png`}
            style={{ border: "none", width: "100%" }}
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
      </object>
    </div>
  );
}
