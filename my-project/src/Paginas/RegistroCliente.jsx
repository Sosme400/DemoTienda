import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate

const RegistroCliente = () => {
  const [cliente, setCliente] = useState({
    nombre: '',
    correo: '',
    direccion: '',
    telefono: '',
    password: '',
    rol: 'cliente',
  });

  const [error, setError] = useState(null);
  const [mensaje, setMensaje] = useState(null);
  const [loading, setLoading] = useState(false); // Para manejar el estado de carga
  const navigate = useNavigate(); // Inicializar el hook de navegación

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCliente({
      ...cliente,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Mostrar el indicador de carga
    try {
      const response = await axios.post('http://localhost:8000/clientes', cliente);
      setMensaje('Registro exitoso.');
      setError(null);
      console.log('Cliente registrado:', response.data);
      
      // Redirigir al login después del registro exitoso
      navigate('/login');
    } catch (error) {
      setError('Error al registrar el cliente.');
      setMensaje(null);
      console.error('Error al registrar el cliente:', error);
    } finally {
      setLoading(false); // Ocultar el indicador de carga
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-black to-blue-900">
      <div className="relative w-full max-w-lg bg-black bg-opacity-70 border border-purple-500 p-8 rounded-xl shadow-lg">
        <h1 className="text-white text-5xl font-extrabold text-center mb-4 bg-clip-text bg-gradient-to-r from-pink-500 to-violet-500">
          TiendaMC
        </h1>
        <h2 className="text-white text-3xl font-bold text-center mb-4">Crea tu cuenta Ahora!!</h2>

        <div className="flex justify-center gap-4 mb-6">
          <button className="ease-in duration-300 outline-2 outline-blue-500/50 px-4 py-2 rounded-lg">Google</button>
          <button className="ease-in duration-300 outline-2 outline-blue-500/50 px-4 py-2 rounded-lg">Facebook</button>
        </div>

        <div className="text-center text-gray-400 mb-6">Or</div>

        {error && <p className="bg-red-100 text-red-700 p-2 rounded mb-4">{error}</p>}
        {mensaje && <p className="bg-green-100 text-green-700 p-2 rounded mb-4">{mensaje}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-300">Nombre</label>
            <input
              type="text"
              name="nombre"
              value={cliente.nombre}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-transparent border border-gray-500 text-white rounded-lg focus:outline-none focus:border-purple-500"
              placeholder="Ingrese su nombre"
              required
            />
          </div>

          <div>
            <label className="block text-gray-300">Correo</label>
            <input
              type="email"
              name="correo"
              value={cliente.correo}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-transparent border border-gray-500 text-white rounded-lg focus:outline-none focus:border-purple-500"
              placeholder="Ingrese su correo"
              required
            />
          </div>

          <div>
            <label className="block text-gray-300">Dirección</label>
            <input
              type="text"
              name="direccion"
              value={cliente.direccion}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-transparent border border-gray-500 text-white rounded-lg focus:outline-none focus:border-purple-500"
              placeholder="Ingrese su dirección"
              required
            />
          </div>

          <div>
            <label className="block text-gray-300">Teléfono</label>
            <input
              type="text"
              name="telefono"
              value={cliente.telefono}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-transparent border border-gray-500 text-white rounded-lg focus:outline-none focus:border-purple-500"
              placeholder="Ingrese su teléfono"
              required
            />
          </div>

          <div>
            <label className="block text-gray-300">Password</label>
            <input
              type="password"
              name="password"
              value={cliente.password}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-transparent border border-gray-500 text-white rounded-lg focus:outline-none focus:border-purple-500"
              placeholder="Ingrese su contraseña"
              required
            />
            <div className="text-right text-sm text-gray-400 mt-2">
              <a href="#" className="hover:underline">Forgot?</a>
            </div>
          </div>

          <button
            type="submit"
            className="ease-in-out duration-300 bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 w-full"
            disabled={loading} // Deshabilitar el botón mientras se está procesando
          >
            {loading ? (
              <svg className="animate-spin h-5 w-5 mr-3 text-white inline" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="4" fill="none" />
                <path fill="white" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
              </svg>
            ) : (
              'Create account'
            )}
          </button>
        </form>

        <div className="text-center text-gray-400 mt-6">
          Already Have An Account? <a href="/login" className="text-purple-500 hover:underline">Log in</a>
        </div>
      </div>
    </div>
  );
};

export default RegistroCliente;
