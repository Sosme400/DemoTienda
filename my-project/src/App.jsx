import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegistroCliente from "./Paginas/RegistroCliente.jsx"; 
import Login from "./Paginas/Login.jsx"; 
import Home from "./Paginas/Home.jsx"; 
import Tienda from "./tablas/Productos.jsx"; // Ruta corregida
import Admin from "./Paginas/Admin.jsx"; // Importa el componente Admin

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RegistroCliente />} /> {/* Página de registro */}
        <Route path="/login" element={<Login />} /> {/* Página de login */}
        <Route path="/home" element={<Home />} /> {/* Página de inicio */}
        <Route path="/tienda" element={<Tienda />} /> {/* Página de Tienda */}
        <Route path="/admin" element={<Admin />} /> {/* Página de Administración */}
      </Routes>
    </Router>
  );
}

export default App;
