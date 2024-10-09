import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegistroCliente from './Paginas/RegistroCliente.jsx';
import Login from './Paginas/Login.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RegistroCliente />} /> {/* Página de registro */}
        <Route path="/login" element={<Login />} /> {/* Página de login */}
      </Routes>
    </Router>
  );
}

export default App;
