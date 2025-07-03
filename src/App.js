 import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
 import InicioPage from './pages/InicioPage';
 import CuentasPage from './pages/CuentasPage';
 import ContactoPage from './pages/ContactoPage';
import Navbar from './components/Navbar';  // ← importa Navbar

 function App() {
   return (
     <Router>
      <Navbar />   
       <Routes>
         <Route path="/" element={<InicioPage />} />
         <Route path="/cuentas" element={<CuentasPage />} />
         <Route path="/contacto" element={<ContactoPage />} />
       </Routes>
     </Router>
   );
 }

 export default App;
