import React from 'react';

const Home = () => {
  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="flex flex-grow">
        {/* Sidebar */}
        <div className="w-1/4 bg-blue-800 text-white p-4">
          <h2 className="text-xl font-bold">TiendaMC</h2>
          <div className="mt-4">
            <p>Perfil Administrador</p>
            <p>Jesus Sanchez</p>
          </div>
          <nav className="mt-6">
            <ul>
              <li className="py-2 hover:bg-blue-700 cursor-pointer">Home</li>
              <li className="py-2 hover:bg-blue-700 cursor-pointer">Agregar Productos</li>
              <li className="py-2 hover:bg-blue-700 cursor-pointer">Agregar Kits</li>
              <li className="py-2 hover:bg-blue-700 cursor-pointer">Tabla Usuarios</li>
            </ul>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-grow p-4 bg-gradient-to-b from-gray-300 to-white">
          <h1 className="text-3xl font-bold mb-4">Bienvenido Administrador</h1>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-gray-200 rounded-lg p-4 flex flex-col items-center">
              <h2 className="font-semibold">Img 1</h2>
              <p>Coche</p>
            </div>
            <div className="bg-gray-200 rounded-lg p-4 flex flex-col items-center">
              <h2 className="font-semibold">Img 2</h2>
              <p>Moto</p>
            </div>
            <div className="bg-gray-200 rounded-lg p-4 flex flex-col items-center">
              <h2 className="font-semibold">Img 3</h2>
              <p>Excavadora</p>
            </div>
            <div className="bg-gray-200 rounded-lg p-4 flex flex-col items-center">
              <h2 className="font-semibold">Img 4</h2>
              <p>Manzana encantada</p>
            </div>
            <div className="bg-gray-200 rounded-lg p-4 flex flex-col items-center">
              <h2 className="font-semibold">Img 5</h2>
              <p>Perla de ender</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
