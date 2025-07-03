import { HashRouter as Router, Routes, Route } from "react-router-dom";
import InicioPage from "./pages/InicioPage";
import CuentasPage from "./pages/CuentasPage";
import ContactoPage from "./pages/ContactoPage";
import './styles/colors.css';





function App() {
  return (
    <Router>
      <Routes>
       <Route path="/" element={<InicioPage />} />
        <Route path="/cuentaspage" element={<CuentasPage />} />
        <Route path="/contactoPage" element={<ContactoPage />} />


      </Routes>
    </Router>
  );
}

export default App;
