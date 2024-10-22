import React, { useState, useEffect } from 'react';

const Admin = () => {
  const [products, setProducts] = useState([]); // Estado para almacenar los productos
  const [categories, setCategories] = useState([]); // Estado para almacenar las categorías
  const [selectedProduct, setSelectedProduct] = useState(null); // Producto seleccionado para edición
  const [formValues, setFormValues] = useState({ nombre_producto: '', descripcion: '', precio: '', stock: '', id_categoria: '', imagen_url: '' }); // Valores del formulario
  const [isEditing, setIsEditing] = useState(false); // Estado para saber si estamos editando o creando

  // Función para obtener los productos desde el backend
  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/products');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  // Función para obtener las categorías desde el backend
  const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/categories');
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  // Llamar a las funciones cuando el componente se monte
  useEffect(() => {
    fetchProducts();
    fetchCategories(); // Cargar las categorías cuando se monte el componente
  }, []);

  // Función para manejar el cambio en los valores del formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  // Función para crear un nuevo producto
  const handleCreateProduct = async () => {
    try {
      const response = await fetch('http://localhost:8000/productos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formValues),
      });
      const data = await response.json();
      setProducts([...products, data]); // Actualiza la lista de productos
      setFormValues({ nombre_producto: '', descripcion: '', precio: '', stock: '', id_categoria: '', imagen_url: '' }); // Limpia el formulario
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };

  // Función para seleccionar un producto para editar
  const handleEditProduct = (product) => {
    setFormValues(product);
    setSelectedProduct(product);
    setIsEditing(true);
  };

  // Función para actualizar un producto
  const handleUpdateProduct = async () => {
    try {
      const response = await fetch(`http://localhost:8000/productos/${selectedProduct.id_producto}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formValues),
      });
      await response.json();
      fetchProducts(); // Recargar la lista de productos
      setIsEditing(false); // Cambiar el estado de edición
      setFormValues({ nombre_producto: '', descripcion: '', precio: '', stock: '', id_categoria: '', imagen_url: '' }); // Limpia el formulario
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  // Función para eliminar un producto
  const handleDeleteProduct = async (id_producto) => {
    try {
      await fetch(`http://localhost:8000/productos/${id_producto}`, {
        method: 'DELETE',
      });
      setProducts(products.filter(product => product.id_producto !== id_producto)); // Actualiza la lista de productos sin el eliminado
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  // Función para manejar el envío del formulario (crear o actualizar)
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      handleUpdateProduct();
    } else {
      handleCreateProduct();
    }
  };

  // Función para mostrar imagen o modelo 3D
  const renderImageOrModel = (url) => {
    if (!url) {
      return <div>No image or model available</div>; 
    }
    // Verificar si es un modelo 3D de Sketchfab
    if (url.includes('sketchfab.com')) {
      const modelId = url.split('/').pop(); // Obtener el ID del modelo
      return (
        <iframe
          title="Modelo 3D"
          width="100%"
          height="300"
          src={`https://sketchfab.com/models/${modelId}/embed`}
          frameBorder="0"
          allow="autoplay; fullscreen; vr"
          allowFullScreen
        ></iframe>
      );
    } else {
      return <img src={url} alt="Producto" className="w-full h-32 object-cover rounded" />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'linear-gradient(180deg, #545466 0%, rgba(84, 84, 102, 0.4) 100%)' }}>
      <nav className="bg-gray-900 text-white py-4 px-6 flex justify-between items-center">
        <div className="flex items-center">
          <span className="text-2xl font-bold">🛠️ Admin - TiendaMC</span>
        </div>
      </nav>

      <div className="flex flex-grow h-screen">
        <div className="w-64 bg-gray-900 text-white flex flex-col justify-between p-4">
          <div>
            <input
              type="text"
              placeholder="Search..."
              className="w-full p-2 mb-4 bg-gray-800 rounded"
            />
            <ul className="space-y-4">
              <li>
                <a href="#" className="flex items-center p-2 text-lg rounded hover:bg-gray-600 bg-blue-700">
                  🏠 Home
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center p-2 text-lg rounded hover:bg-gray-600 bg-green-700">
                  🛠️ Admin
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center p-2 text-lg rounded hover:bg-gray-600 bg-red-700">
                  📦 Products
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center w-full overflow-y-auto p-8">
          <h1 className="text-4xl font-extrabold text-white mb-6">Administración de Productos</h1>

          {/* Formulario para crear o editar productos */}
          <form className="mb-6 w-full max-w-xl" onSubmit={handleSubmit}>
            <input
              type="text"
              name="nombre_producto"
              placeholder="Nombre del producto"
              value={formValues.nombre_producto}
              onChange={handleInputChange}
              className="p-2 mb-4 border rounded w-full"
              required
            />
            <input
              type="text"
              name="descripcion"
              placeholder="Descripción"
              value={formValues.descripcion}
              onChange={handleInputChange}
              className="p-2 mb-4 border rounded w-full"
              required
            />
            <input
              type="number"
              name="precio"
              placeholder="Precio"
              value={formValues.precio}
              onChange={handleInputChange}
              className="p-2 mb-4 border rounded w-full"
              required
            />
            <input
              type="number"
              name="stock"
              placeholder="Stock"
              value={formValues.stock}
              onChange={handleInputChange}
              className="p-2 mb-4 border rounded w-full"
              required
            />
            <input
              type="text"
              name="imagen_url"
              placeholder="URL de la Imagen o Modelo 3D"
              value={formValues.imagen_url}
              onChange={handleInputChange}
              className="p-2 mb-4 border rounded w-full"
            />
            <select
              name="id_categoria"
              value={formValues.id_categoria}
              onChange={handleInputChange}
              className="p-2 mb-4 border rounded w-full"
              required
            >
              <option value="">Seleccionar Categoría</option>
              {categories.map((category) => (
                <option key={category.id_categoria} value={category.id_categoria}>
                  {category.nombre_categoria}
                </option>
              ))}
            </select>
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded w-full"
            >
              {isEditing ? 'Actualizar Producto' : 'Crear Producto'}
            </button>
          </form>

          {/* Tabla de productos */}
          <table className="min-w-full bg-gray-700 text-white rounded-lg">
            <thead>
              <tr className="bg-gray-800">
                <th className="py-3 px-6 text-left">ID</th>
                <th className="py-3 px-6 text-left">Nombre</th>
                <th className="py-3 px-6 text-left">Categoría</th>
                <th className="py-3 px-6 text-left">Precio</th>
                <th className="py-3 px-6 text-left">Acciones</th>
                <th className="py-3 px-6 text-left">Imagen/Modelo 3D</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id_producto} className="border-b border-gray-600">
                  <td className="py-3 px-6">{product.id_producto}</td>
                  <td className="py-3 px-6">{product.nombre_producto}</td>
                  <td className="py-3 px-6">{product.nombre_categoria}</td>
                  <td className="py-3 px-6">${product.precio}</td>
                  <td className="py-3 px-6">
                    <button
                      className="bg-yellow-500 text-white p-2 rounded mr-2"
                      onClick={() => handleEditProduct(product)}
                    >
                      Editar
                    </button>
                    <button
                      className="bg-red-500 text-white p-2 rounded"
                      onClick={() => handleDeleteProduct(product.id_producto)}
                    >
                      Eliminar
                    </button>
                  </td>
                  <td className="py-3 px-6">
                    {/* Mostrar la imagen o modelo 3D */}
                    {renderImageOrModel(product.imagen_url)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Admin;
