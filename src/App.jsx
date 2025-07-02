import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Accounts from './pages/Accounts';
import Contact from './pages/Contact';
import BottomNav from './components/BottomNav';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="w-full">
        <BottomNav />
      </div>
      <div className="flex-grow flex justify-center items-center">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/accounts" element={<Accounts />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
