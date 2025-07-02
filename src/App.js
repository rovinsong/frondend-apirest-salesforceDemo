import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import CursosPage from "./pages/CursosPage";
import EstudiantesPage from "./pages/EstudiantesPage";
import InicioPage from "./pages/InicioPage";
import AsistenciaPage from "./pages/AsistenciaPage"; 
import HistorialPage from "./pages/HistorialPage";
import CargarEstudiantesPage from "./pages/CargarEstudiantesPage";
import './styles/colors.css';





function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<InicioPage />} />
        <Route path="/cursos" element={<CursosPage />} />
        <Route path="/estudiantes" element={<EstudiantesPage />} />
        <Route path="/asistencia" element={<AsistenciaPage />} /> 
        <Route path="/historial" element={<HistorialPage />} />
        <Route path="/cargar-estudiantes" element={<CargarEstudiantesPage />} />

      </Routes>
    </Router>
  );
}

export default App;
