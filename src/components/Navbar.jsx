// src/components/Navbar.jsx
import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const location = useLocation();

  const navItemClass = (path) =>
    `px-4 py-2 ${location.pathname === path ? 'text-blue-400' : 'text-white'} hover:text-blue-300`;

  return (
    <nav className="bg-gray-800 text-white px-6 py-3 shadow-md flex justify-between items-center">
      <span className="font-bold text-xl">Salesforce Demo</span>
      <div className="flex space-x-4">
        <Link to="/" className={navItemClass('/')}>Inicio</Link>
        <Link to="/accounts" className={navItemClass('/accounts')}>Cuentas</Link>
        <Link to="/contact" className={navItemClass('/contact')}>Contáctanos</Link>
      </div>
    </nav>
  );
}

export default Navbar;
