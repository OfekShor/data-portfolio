import React, { useState } from "react";
import {
  BarChart, Bar,
  LineChart, Line,
  PieChart, Pie, Cell,
  XAxis, YAxis, Tooltip,
  CartesianGrid, Legend,
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
    label: "Market Value per Stock",
    query: 'SELECT "Stock Ticker" AS Symbol, "Mkt Value" FROM summary_osv LIMIT 15;',
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
      setError("Connection error.");
    } finally {
      setLoading(false);
    }
  };

  const formattedData = data?.rows
    .map((row) =>
      Object.fromEntries(
        data.columns.map((col, i) => {
          let value = row[i];
          if (typeof value === "string") {
            const cleaned = value.replace(/[$,]/g, "").trim();
            value = isNaN(cleaned) ? value : parseFloat(cleaned);
          }
          return [col.trim(), value];
        })
      )
    )
    .filter((row) => {
      const numericColumn = Object.values(row).find(v => typeof v === "number");
      return numericColumn !== undefined;
    });

  const renderChart = () => {
    if (!formattedData || formattedData.length === 0) return null;

    const keys = Object.keys(formattedData[0]);

    if (keys.includes("Date") && keys.includes("Price")) {
      return (
        <LineChart width={700} height={300} data={formattedData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="Date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="Price" stroke="#8884d8" />
        </LineChart>
      );
    }

    if (keys.includes("Symbol") && keys.includes("Price")) {
      return (
        <BarChart width={700} height={300} data={formattedData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="Symbol" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Price" fill="#82ca9d" />
        </BarChart>
      );
    }

    if (keys.includes("Symbol") && keys.includes("Mkt Value")) {
      return (
        <BarChart width={700} height={300} data={formattedData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="Symbol" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Mkt Value" fill="#8884d8" />
        </BarChart>
      );
    }

    if (keys.includes("Symbol") && keys.includes("Weight")) {
      return (
        <PieChart width={400} height={300}>
          <Pie
            data={formattedData}
            dataKey="Weight"
            nameKey="Symbol"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label
          >
            {formattedData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={`hsl(${(index * 50) % 360}, 60%, 60%)`} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      );
    }

    return null;
  };

  return (
    <div className="pt-24 px-6 max-w-6xl mx-auto text-center">
      <h1 className="text-4xl font-bold mb-4 text-gray-900">
        Dynamic SQL Queries & Instant Charts
      </h1>
      <p className="mb-8 text-gray-700 text-lg">
        Run real-time SQL queries on live data, visualize results immediately, and explore hidden insights. Predefined examples included.
      </p>

      {/* 🔘 שאילתות מוכנות */}
      <section className="mb-8 text-left">
        <h2 className="text-xl font-semibold mb-2">🧠 Predefined Queries</h2>
        <p className="text-gray-600 text-sm mb-4">
         Click one of the predefined buttons below to run a sample query and see a live visualization.
        </p>

        <div className="flex flex-wrap gap-3">
          {predefinedQueries.map((item, i) => (
            <button
              key={i}
              onClick={() => runQuery(item.query)}
              className="bg-gray-200 hover:bg-gray-300 text-sm px-4 py-2 rounded shadow-sm"
            >
              {item.label}
            </button>
          ))}
        </div>
      </section>

      {/* 💬 שאילתה ידנית */}
      <section className="mb-8 text-left">
        <h2 className="text-xl font-semibold mb-2">✍️ Custom SQL Query</h2>
        <textarea
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="e.g., SELECT * FROM price_history LIMIT 10;"
          className="w-full p-3 border rounded font-mono text-sm h-32"
        />
        <button
          onClick={() => runQuery(query)}
          className="mt-3 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 shadow"
          disabled={loading}
        >
          {loading ? "Running..." : "Run Query"}
        </button>
      </section>

      {/* ⚠️ שגיאה */}
      {error && <div className="text-red-600 font-medium mt-4">⚠️ {error}</div>}

      {/* 📊 גרף מעל טבלה */}
      {data && (
        <>
          <div className="mt-12">
            <h2 className="text-xl font-semibold mb-4 text-left">📈 Visual Representation</h2>
            {renderChart()}
          </div>

          <section className="overflow-x-auto mt-10 border rounded-lg text-left">
            <table className="min-w-full text-sm border-collapse">
              <thead>
                <tr>
                  {data.columns.map((col) => (
                    <th key={col} className="border px-3 py-2 bg-gray-100 font-bold">{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.rows.map((row, idx) => (
                  <tr key={idx}>
                    {row.map((cell, i) => (
                      <td key={i} className="border px-3 py-2">{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </>
      )}
    </div>
  );
}
