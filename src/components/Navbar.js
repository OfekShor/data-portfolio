// src/components/Navbar.js
import React from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">Data Portfolio</div>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/queries">Queries</Link></li>
        <li><Link to="/exports">Exports</Link></li>
        <li><Link to="/visuals">Visuals</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
