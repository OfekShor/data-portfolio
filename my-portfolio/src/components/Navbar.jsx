import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md px-6 py-3 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold text-gray-800">
        Ofek Shor – Data Portfolio
      </Link>
      <ul className="flex space-x-6 text-sm text-gray-700">
        <li><Link to="/" className="hover:text-blue-600">Home</Link></li>
        <li><Link to="/queries" className="hover:text-blue-600">Queries</Link></li>
        <li><Link to="/exports" className="hover:text-blue-600">Exports</Link></li>
        <li><Link to="/visuals" className="hover:text-blue-600">Visuals</Link></li>
      </ul>
    </nav>
  );
}
