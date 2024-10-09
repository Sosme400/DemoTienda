import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [credentials, setCredentials] = useState({
    correo: '',
    password: '',
  });

  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Para redirigir después del login

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/login', credentials);
      console.log('Usuario autenticado:', response.data);
      // Redirigir a la página principal después del login exitoso
      navigate('/');
    } catch (error) {
      setError('Error al iniciar sesión.');
      console.error('Error al iniciar sesión:', error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-black to-blue-900">
      <div className="relative w-full max-w-md bg-black bg-opacity-70 border border-purple-500 p-8 rounded-xl shadow-lg">
        <h1 className="text-white text-5xl font-extrabold text-center mb-4 bg-clip-text bg-gradient-to-r from-pink-500 to-violet-500">
          TiendaMC
        </h1>
        <h2 className="text-white text-3xl font-bold text-center mb-4">Iniciar Sesión</h2>
        
        {error && <p className="bg-red-100 text-red-700 p-2 rounded mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-300">Correo</label>
            <input
              type="email"
              name="correo"
              value={credentials.correo}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-transparent border border-gray-500 text-white rounded-lg focus:outline-none focus:border-purple-500"
              placeholder="Ingrese su correo"
              required
            />
          </div>

          <div>
            <label className="block text-gray-300">Password</label>
            <input
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-transparent border border-gray-500 text-white rounded-lg focus:outline-none focus:border-purple-500"
              placeholder="Ingrese su contraseña"
              required
            />
          </div>

          <button type="submit" className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 w-full">
            Iniciar Sesión
          </button>
        </form>

        <div className="text-center text-gray-400 mt-6">
          No tienes una cuenta? <a href="/" className="text-purple-500 hover:underline">Crea una cuenta</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
