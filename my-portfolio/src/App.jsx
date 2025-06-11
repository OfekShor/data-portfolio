import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Queries from "./pages/Queries";
import Exports from "./pages/Exports";
import Visuals from "./pages/Visuals";
import "./styles/App.css";

function App() {
  return (
    <Router>
      <div className="App flex flex-col min-h-screen">
        {/* 🧭 Sticky Navbar */}
        <header className="sticky top-0 z-50">
          <Navbar />
        </header>

        {/* 🔄 Page Content */}
        <main className="flex-grow pb-20">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/queries" element={<Queries />} />
            <Route path="/exports" element={<Exports />} />
            <Route path="/visuals" element={<Visuals />} />
          </Routes>
        </main>

        {/* 📞 Persistent Footer */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
