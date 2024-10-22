import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Importa Link

const Tienda = () => {
  const [selected, setSelected] = useState('');
  const [products, setProducts] = useState([]);

  const handleSelection = (option) => {
    setSelected(option);
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/products');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Agrupar productos por categoría
  const groupedProducts = products.reduce((acc, product) => {
    const category = product.nombre_categoria || 'Sin categoría'; // Asegúrate de que el nombre de la categoría esté presente
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(product);
    return acc;
  }, {});

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'linear-gradient(180deg, #545466 0%, rgba(84, 84, 102, 0.4) 100%)' }}>
      <nav className="bg-gray-900 text-white py-4 px-6 flex justify-between items-center">
        <div className="flex items-center">
          <span className="text-2xl font-bold">🕹️ TiendaMC</span>
        </div>
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m-15 6h15m-15-12h15" />
          </svg>
        </div>
      </nav>

      <div className="flex flex-grow h-screen">
        <div className="w-64 bg-gray-900 text-white flex flex-col justify-between p-4">
          <div>
            <input type="text" placeholder="Search..." className="w-full p-2 mb-4 bg-gray-800 rounded" />
            <ul className="space-y-4">
              <li>
                <Link
                  to="/home"
                  onClick={() => handleSelection('home')}
                  className={`flex items-center p-2 text-lg rounded hover:bg-gray-600 ${selected === 'home' ? 'bg-blue-700' : 'bg-gray-700'}`}
                >
                  🏠 Home
                </Link>
              </li>
              <li>
                <Link
                  to="/tienda"
                  onClick={() => handleSelection('tienda')}
                  className={`flex items-center p-2 text-lg rounded hover:bg-gray-600 ${selected === 'tienda' ? 'bg-green-700' : 'bg-gray-700'}`}
                >
                  📦 Tienda
                </Link>
              </li>
              <li>
                <Link
                  to="/carrito"
                  onClick={() => handleSelection('carrito')}
                  className={`flex items-center p-2 text-lg rounded hover:bg-gray-600 ${selected === 'carrito' ? 'bg-red-700' : 'bg-gray-700'}`}
                >
                  🛒 Carrito de compras
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  onClick={() => handleSelection('about')}
                  className={`flex items-center p-2 text-lg rounded hover:bg-gray-600 ${selected === 'about' ? 'bg-purple-700' : 'bg-gray-700'}`}
                >
                  ℹ️ About
                </Link>
              </li>
            </ul>
          </div>

          <div className="p-4 bg-gray-800 rounded-lg mt-auto">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-blue-500 rounded-full"></div>
                <div className="ml-2">
                  <p>Perfil</p>
                  <p>jesus Sanchez</p>
                </div>
              </div>
              <a href="#" className="text-red-500">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-3A2.25 2.25 0 008.25 5.25V9m-3 0h12M4.5 9l1.5 10.5A2.25 2.25 0 008.25 21h7.5a2.25 2.25 0 002.25-1.5L19.5 9m-15 0h12" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Contenido principal - Productos y Categorías */}
        <div className="flex flex-col items-center w-full overflow-y-auto">
          <h1 className="text-5xl font-extrabold text-center mb-8 text-white bg-clip-text bg-gradient-to-r from-pink-500 to-violet-500">
            Bienvenido a la tienda de objetos
          </h1>

          {/* GIF de Enchanter */}
          <div style={{ width: '100%', maxWidth: '320px', height: 'auto', margin: '0 auto', marginBottom: '20px' }}>
            <img src="https://minecraft.wiki/images/Enchanter_Idle.gif?c70a6" alt="Gif de Enchanter" style={{ width: '100%', height: 'auto' }} />
          </div>

          <div className="w-full max-w-6xl px-4">
            {Object.entries(groupedProducts).map(([category, products]) => (
              <div key={category} className="mb-8">
                <h2 className="text-3xl font-bold text-white mb-4">{category}</h2>
                <div className="grid grid-cols-3 gap-4">
                  {products.map((product) => (
                    <div key={product.id_producto} className="bg-gray-700 rounded-lg p-4">
                      <h3 className="text-white">{product.nombre_producto}</h3>
                      <p className="text-white">{product.descripcion}</p>
                      <p className="text-white">${product.precio}</p>
                      <p className="text-white">Stock: {product.stock}</p>
                      {product.imagen_url && (
                        <img
                          src={product.imagen_url}
                          alt={product.nombre_producto}
                          className="w-full h-auto object-contain rounded"
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <footer className="bg-gray-900 text-white py-4 px-6 w-full"></footer>
    </div>
  );
};

export default Tienda;
