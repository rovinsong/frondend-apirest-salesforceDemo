// src/components/Navbar.jsx
import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const location = useLocation();

  const navItem = (to, label) => (
    <Link
      to={to}
      className={`px-4 py-2 rounded ${
        location.pathname === to ? 'text-blue-400' : 'text-white'
      } hover:text-blue-300`}
    >
      {label}
    </Link>
  );

  return (
    <nav className="bg-gray-800 px-6 py-4 shadow-md flex justify-between items-center">
      <span className="font-bold text-xl">Salesforce Demo</span>
      <div className="flex space-x-4">
        {navItem('/', 'Inicio')}
        {navItem('/accounts', 'Cuentas')}
        {navItem('/contact', 'Contáctanos')}
      </div>
    </nav>
  );
}

export default Navbar;
