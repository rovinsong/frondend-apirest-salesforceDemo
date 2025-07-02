import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Accounts from "./pages/Accounts";
import Contact from "./pages/Contact";

import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import HomeIcon from "@mui/icons-material/Home";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import ContactMailIcon from "@mui/icons-material/ContactMail";

import { useEffect, useState } from "react";

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const pathToIndex = {
    "/": 0,
    "/accounts": 1,
    "/contact": 2,
  };

  const indexToPath = ["/", "/accounts", "/contact"];
  const [value, setValue] = useState(pathToIndex[location.pathname] || 0);

  useEffect(() => {
    navigate(indexToPath[value]);
  }, [value]);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      {/* Menú arriba */}
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => setValue(newValue)}
        sx={{
          backgroundColor: "#1f2937",
          color: "#fff",
          ".Mui-selected": {
            color: "#60a5fa",
          },
        }}
      >
        <BottomNavigationAction label="Inicio" icon={<HomeIcon />} />
        <BottomNavigationAction label="Cuentas" icon={<AccountBoxIcon />} />
        <BottomNavigationAction label="Contáctanos" icon={<ContactMailIcon />} />
      </BottomNavigation>

      {/* Contenido centrado */}
      <main className="flex-grow flex justify-center items-center p-6">
        <div className="w-full max-w-5xl text-center">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/accounts" element={<Accounts />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}

export default App;
