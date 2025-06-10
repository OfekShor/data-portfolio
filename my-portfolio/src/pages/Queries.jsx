import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";

const predefinedQueries = [
  {
    label: "Recent Prices",
    query: "SELECT Date, Symbol, Price FROM price_history ORDER BY Date DESC LIMIT 10;",
  },
  {
    label: "Average Price per Symbol",
    query: "SELECT Symbol, AVG(Price) AS Price FROM price_history GROUP BY Symbol;",
  },
  {
    label: "Portfolio Summary",
    query: "SELECT * FROM portfolio_summary;",
  },
];

export default function Queries() {
  const [query, setQuery] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const runQuery = async (sql) => {
    setLoading(true);
    setError(null);
    setData(null);
    try {
      const response = await fetch("https://data-api-backend.onrender.com/run_query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: sql }),
      });

      const result = await response.json();
      if (response.ok) {
        setData(result);
        setQuery(sql);
      } else {
        setError(result.error || "Query failed.");
      }
    } catch (err) {
      setError("Connection to server failed.");
    } finally {
      setLoading(false);
    }
  };

  const formattedData =
    data?.columns.includes("Date") && data?.columns.includes("Price")
      ? data.rows.map((row) => {
          const rowObj = {};
          data.columns.forEach((col, i) => {
            rowObj[col] = row[i];
          });
          return rowObj;
        })
      : null;

  return (
    <div className="p-6 max-w-6xl mx-auto text-left">
      <h1 className="text-3xl font-bold mb-6">Run SQL Queries</h1>

      <section className="mb-6">
        <p className="text-gray-700 mb-2">Choose a predefined query:</p>
        <div className="flex flex-wrap gap-2">
          {predefinedQueries.map((item, i) => (
            <button
              key={i}
              onClick={() => runQuery(item.query)}
              className="bg-gray-200 hover:bg-gray-300 text-sm px-4 py-2 rounded"
            >
              {item.label}
            </button>
          ))}
        </div>
      </section>

      <section className="mb-6">
        <p className="text-gray-700 mb-2">Or write your own SQL query:</p>
        <textarea
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Write a custom SQL query here..."
          className="w-full p-3 border rounded font-mono text-sm h-32"
        />
        <button
          onClick={() => runQuery(query)}
          className="mt-3 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? "Running..." : "Run Query"}
        </button>
      </section>

      {error && <div className="text-red-500 mt-4">⚠️ {error}</div>}

      {data && (
        <>
          <section className="overflow-x-auto mt-6">
            <table className="min-w-full border text-sm text-left">
              <thead>
                <tr>
                  {data.columns.map((col) => (
                    <th key={col} className="border px-3 py-1 bg-gray-100 font-bold">{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.rows.map((row, idx) => (
                  <tr key={idx}>
                    {row.map((cell, i) => (
                      <td key={i} className="border px-3 py-1">{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          {formattedData && (
            <div className="mt-10">
              <h2 className="text-xl font-semibold mb-2">Price Chart</h2>
              <BarChart width={700} height={300} data={formattedData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="Date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Price" fill="#8884d8" />
              </BarChart>
            </div>
          )}
        </>
      )}
    </div>
  );
}
