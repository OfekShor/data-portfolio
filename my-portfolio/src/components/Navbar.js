import React from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        Ofek Shor – Data Portfolio
      </Link>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/queries">Queries</Link></li>
        <li><Link to="/exports">Exports</Link></li>
        <li><Link to="/visuals">Visuals</Link></li>
      </ul>
    </nav>
  );
}
