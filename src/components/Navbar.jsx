import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from 'frontend/public/logoManuelita.png'; 

export default function Navbar() {
  const location = useLocation();
  const linkClass = (path) =>
    `px-4 py-2 rounded-md text-sm font-medium ${
      location.pathname === path
        ? 'bg-blue-700 text-white'
        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
    }`;

  return (
    <nav className="bg-gray-900 shadow-md px-6 py-3 flex justify-between items-center">
      {/* Logo + título */}
      <div className="flex items-center space-x-3">
        <img src={logo} alt="Logo" className="h-10 w-auto" />
        <span className="text-white font-bold text-xl">Salesforce Demo</span>
      </div>

      {/* Enlaces */}
      <div className="flex space-x-4">
        <Link to="/" className={linkClass('/')}>Inicio</Link>
        <Link to="/cuentas" className={linkClass('/cuentas')}>Cuentas</Link>
        <Link to="/contacto" className={linkClass('/contacto')}>Contáctanos</Link>
      </div>
    </nav>
  );
}
