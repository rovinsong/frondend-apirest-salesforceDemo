import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import InicioPage from "./pages/InicioPage";
import CuentasPage from "./pages/CuentasPage";
import ContactoPage from "./pages/ContactoPage";
import './styles/colors.css';





function App() {
  return (
    <Router>
      <Routes>
       <Route path="/" element={<InicioPage />} />
        <Route path="/cuentas" element={<CuentasPage />} />
        <Route path="/contacto" element={<ContactoPage />} />


      </Routes>
    </Router>
  );
}

export default App;
