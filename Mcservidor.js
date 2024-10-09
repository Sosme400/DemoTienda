const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');  // Importa cors

const app = express();
const port = 8000;

// Middleware para JSON
app.use(express.json());

// Configurar CORS para permitir solicitudes del frontend
app.use(cors({
    origin: 'http://localhost:5173',  // Reemplaza esto por el dominio/puerto donde está corriendo tu frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

// Configurar la conexión a la base de datos
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Sosme2004',
    database: 'tienda2'
});

// Conectar a la base de datos
db.connect((err) => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err.message);
        return;
    }
    console.log('Conexión a la base de datos exitosa.');
});

// *** CRUD para Clientes ***
app.post("/clientes", (req, res) => {
    const { nombre, correo, direccion, telefono, password, rol } = req.body;

    // Validar que todos los campos requeridos están presentes
    if (!nombre || !correo || !direccion || !telefono || !password) {
        return res.status(400).json({ error: "Todos los campos son obligatorios" });
    }

    const query = "INSERT INTO clientes (nombre, correo, direccion, telefono, password, rol) VALUES (?, ?, ?, ?, ?, ?)";
    db.query(query, [nombre, correo, direccion, telefono, password, rol || 'cliente'], (err, results) => {
        if (err) {
            console.error("Error al insertar el cliente:", err.message);
            return res.status(500).json({ error: "Error al insertar el cliente", details: err.message });
        }
        res.json({ message: "Cliente insertado correctamente", id: results.insertId });
    });
});

// Otros CRUDs (productos, kits, etc.)

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
});
