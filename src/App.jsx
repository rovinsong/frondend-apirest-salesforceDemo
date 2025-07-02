import { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import Home from './pages/Home';
import Accounts from './pages/Accounts';
import Contact from './pages/Contact';

function App() {
  const [value, setValue] = useState(0);
  const navigate = useNavigate();

  const handleNavigation = (event, newValue) => {
    setValue(newValue);
    if (newValue === 0) navigate('/');
    if (newValue === 1) navigate('/accounts');
    if (newValue === 2) navigate('/contact');
  };

  return (
    <div className="app-container">
      <header className="nav-container">
        <BottomNavigation
          value={value}
          onChange={handleNavigation}
          showLabels
        >
          <BottomNavigationAction label="Inicio" icon={<HomeIcon />} />
          <BottomNavigationAction label="Cuentas" icon={<AccountBoxIcon />} />
          <BottomNavigationAction label="Contáctanos" icon={<ContactMailIcon />} />
        </BottomNavigation>
      </header>

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/accounts" element={<Accounts />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
