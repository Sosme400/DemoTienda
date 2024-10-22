const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = 8000;

// Middleware para parsear JSON
app.use(express.json());

// Configurar CORS
app.use(cors({
  origin: 'http://localhost:5173', // Cambia con el dominio de tu frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

// Configurar conexión a la base de datos MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Sosme2004', // Cambia según tu contraseña
  database: 'tienda2',
});

// Conectar a la base de datos
db.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err.message);
    return;
  }
  console.log('Conexión a la base de datos exitosa.');
});

// Ruta para obtener todos los productos
app.get('/api/products', (req, res) => {
  const query = `
    SELECT productos.id_producto, productos.nombre_producto, productos.precio, productos.stock, productos.imagen_url, categorias.nombre_categoria 
    FROM productos 
    JOIN categorias ON productos.id_categoria = categorias.id_categoria`;

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error al obtener productos:', err.message);
      return res.status(500).json({ error: 'Error al obtener productos' });
    }
    res.json(results);
  });
});

// Ruta para obtener todas las categorías
app.get('/api/categories', (req, res) => {
  const query = 'SELECT * FROM categorias';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error al obtener categorías:', err.message);
      return res.status(500).json({ error: 'Error al obtener categorías' });
    }
    res.json(results);
  });
});

// Ruta para crear un nuevo producto
app.post('/productos', (req, res) => {
  const { nombre_producto, descripcion, precio, stock, id_categoria, imagen_url } = req.body;

  if (!nombre_producto || !precio || !stock || !id_categoria || !imagen_url) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios, incluido el campo de imagen.' });
  }

  const query = 'INSERT INTO productos (nombre_producto, descripcion, precio, stock, id_categoria, imagen_url) VALUES (?, ?, ?, ?, ?, ?)';
  
  db.query(query, [nombre_producto, descripcion, precio, stock, id_categoria, imagen_url], (err, result) => {
    if (err) {
      console.error('Error al insertar producto:', err.message);
      return res.status(500).json({ error: 'Error al insertar producto' });
    }
    res.json({ message: 'Producto creado correctamente', id: result.insertId });
  });
});

// Ruta para actualizar un producto
app.put('/productos/:id', (req, res) => {
  const { id } = req.params;
  const { nombre_producto, descripcion, precio, stock, id_categoria, imagen_url } = req.body;

  if (!nombre_producto || !precio || !stock || !id_categoria || !imagen_url) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios, incluido el campo de imagen.' });
  }

  const query = 'UPDATE productos SET nombre_producto = ?, descripcion = ?, precio = ?, stock = ?, id_categoria = ?, imagen_url = ? WHERE id_producto = ?';
  
  db.query(query, [nombre_producto, descripcion, precio, stock, id_categoria, imagen_url, id], (err) => {
    if (err) {
      console.error('Error al actualizar producto:', err.message);
      return res.status(500).json({ error: 'Error al actualizar producto' });
    }
    res.json({ message: 'Producto actualizado correctamente' });
  });
});

// Ruta para eliminar un producto
app.delete('/productos/:id', (req, res) => {
  const { id } = req.params;

  const query = 'DELETE FROM productos WHERE id_producto = ?';

  db.query(query, [id], (err) => {
    if (err) {
      console.error('Error al eliminar producto:', err.message);
      return res.status(500).json({ error: 'Error al eliminar producto' });
    }
    res.json({ message: 'Producto eliminado correctamente' });
  });
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});
