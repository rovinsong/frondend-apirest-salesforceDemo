import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const location = useLocation();

  const linkClass = (path) =>
    `px-4 py-2 rounded-md text-sm font-medium ${
      location.pathname === path ? 'bg-blue-700 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
    }`;

  return (
    <nav className="bg-gray-900 shadow-md px-6 py-4 flex justify-between items-center">
      <h1 className="text-white font-bold text-xl">Salesforce Demo</h1>
      <div className="flex space-x-4">
        <Link to="/" className={linkClass('/')}>Inicio</Link>
        <Link to="/accounts" className={linkClass('/accounts')}>Cuentas</Link>
        <Link to="/contact" className={linkClass('/contact')}>Contáctanos</Link>
      </div>
    </nav>
  );
}

export default Navbar;
