import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Queries from "./pages/Queries";
import Exports from "./pages/Exports";
import Visuals from "./pages/Visuals";
import "./styles/App.css";

function App() {
  return (
    <Router basename="/data-portfolio">
      <div className="App flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/queries" element={<Queries />} />
            <Route path="/exports" element={<Exports />} />
            <Route path="/visuals" element={<Visuals />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
