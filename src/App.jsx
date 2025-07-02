import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      <Navbar />
      <main className="flex-grow flex items-center justify-center p-6">
        <Outlet />
      </main>
    </div>
  );
}

export default App;
