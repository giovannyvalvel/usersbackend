const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cors = require('cors');

// Inicializar Express
const app = express();

// Usar bodyParser para parsear JSON en el body de las requests
app.use(bodyParser.json());

// Permitir CORS para todas las rutas
app.use(cors());

// Conectar a la base de datos (reemplaza con tus propios parámetros de conexión)
const mysql = require('mysql2');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'JAGVV'
});

// Verificar conexión a la base de datos
connection.connect(error => {
  if (error) throw error;
  console.log('Conexión a la base de datos establecida.');
});

// Puerto en el que correrá el servidor
const PORT = process.env.PORT || 3000;

// Rutas para el CRUD de usuarios
app.get('/usuarios', (req, res) => {
  // TODO: Implementar lógica para obtener y devolver usuarios con paginación
});

app.post('/usuarios', (req, res) => {
  // TODO: Implementar lógica para crear un nuevo usuario
});

app.put('/usuarios/:id', (req, res) => {
  // TODO: Implementar lógica para actualizar un usuario existente
});

app.delete('/usuarios/:id', (req, res) => {
  // TODO: Implementar lógica para eliminar un usuario
});

// Ruta para el login
app.post('/login', (req, res) => {
  // TODO: Implementar lógica de autenticación y generación de token
});

// Ruta para el logout
app.post('/logout', (req, res) => {
  // TODO: Implementar lógica para invalidar el token (si estás guardando tokens en base de datos o lista negra)
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
