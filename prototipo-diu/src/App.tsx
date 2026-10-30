import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Booking from './pages/Booking';
import UserDashboard from './pages/UserDashboard';
import CambiarEstadoMaquinas from './pages/CambiarEstado';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reserva" element={<Booking />} />
        <Route path="/perfil" element={<UserDashboard />} />
        <Route path = "/cambiar" element = {<CambiarEstadoMaquinas/>} />
      </Routes>
    </Router>
  );
}