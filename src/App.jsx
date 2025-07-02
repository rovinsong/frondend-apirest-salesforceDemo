import { Route, Routes, Link } from "react-router-dom";
import Home from "./pages/Home";
import Accounts from "./pages/Accounts";
import Contact from "./pages/Contact";

function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <nav className="bg-gray-800 px-6 py-4 flex justify-between items-center">
        <div className="text-xl font-bold">Salesforce Demo</div>
        <div className="space-x-6">
          <Link to="/" className="hover:underline">Inicio</Link>
          <Link to="/accounts" className="hover:underline">Cuentas</Link>
          <Link to="/contact" className="hover:underline">Contáctanos</Link>
        </div>
      </nav>

      <main className="p-6 flex justify-center">
        <div className="w-full max-w-5xl">
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
