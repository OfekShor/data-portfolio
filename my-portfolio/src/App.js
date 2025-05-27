import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Queries from "./pages/Queries";
import Exports from "./pages/Exports";
import Visuals from "./pages/Visuals";
import "./styles/App.css"; // תיקון הנתיב הזה גם כן

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/queries" element={<Queries />} />
          <Route path="/exports" element={<Exports />} />
          <Route path="/visuals" element={<Visuals />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
