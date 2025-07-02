import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Accounts from "./pages/Accounts";
import Contact from "./pages/Contact";

import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import RestoreIcon from "@mui/icons-material/Home";
import FavoriteIcon from "@mui/icons-material/AccountBox";
import LocationOnIcon from "@mui/icons-material/ContactMail";
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
    <div className="min-h-screen bg-gray-900 text-white flex flex-col justify-between">
      <main className="p-6 flex-grow flex justify-center">
        <div className="w-full max-w-5xl">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/accounts" element={<Accounts />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </div>
      </main>

      {/* Menú de navegación */}
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
        <BottomNavigationAction label="Inicio" icon={<RestoreIcon />} />
        <BottomNavigationAction label="Cuentas" icon={<FavoriteIcon />} />
        <BottomNavigationAction label="Contáctanos" icon={<LocationOnIcon />} />
      </BottomNavigation>
    </div>
  );
}

export default App;
