// src/components/Navbar.jsx
import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const location = useLocation();

  const navItem = (path, label) => (
    <Link
      to={path}
      className={`px-4 py-2 ${location.pathname === path ? 'text-blue-400' : 'text-white'} hover:text-blue-300`}
    >
      {label}
    </Link>
  );

  return (
    <nav className="bg-gray-800 px-6 py-3 shadow-md flex justify-between items-center">
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
