import React from "react";

export default function ProjectCard({ title, description, sheetLink, dashboardLink }) {
  return (
    <div style={{
      border: "1px solid #ccc",
      borderRadius: "12px",
      padding: "20px",
      margin: "20px auto",
      maxWidth: "600px",
      backgroundColor: "#f9f9f9"
    }}>
      <h2>{title}</h2>
      <p>{description}</p>
      <p>
        <a href={sheetLink} target="_blank" rel="noopener noreferrer">📊 Google Sheet</a> |{" "}
        <a href={dashboardLink} target="_blank" rel="noopener noreferrer">📈 Dashboard</a>
      </p>
    </div>
  );
}
