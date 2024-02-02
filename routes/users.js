const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const verifyToken = require('../middlewares/auth');
const router = express.Router();

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).send({ message: "Usuario no encontrado." });
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).send({ message: "Contraseña incorrecta." });
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: 86400 }); // 24 horas
    res.send({ message: "Login exitoso", token, user: { id: user.id, name: user.name, email: user.email } });
  } catch (error) {
    res.status(500).send({ message: "Error al intentar iniciar sesión.", error: error.message });
  }
});

// Registro de usuario
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 8);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    res.json({ message: "Usuario registrado con éxito", newUser });
  } catch (error) {
    res.status(500).send({ message: "Error al registrar el usuario", error: error.message });
  }
});

// Listar usuarios
router.get('/', verifyToken, async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).send({ message: "Error al obtener los usuarios", error: error.message });
  }
});

// Obtener un usuario por ID
router.get('/:id', verifyToken, async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).send({ message: "Usuario no encontrado." });
    }
    res.json(user);
  } catch (error) {
    res.status(500).send({ message: "Error al obtener el usuario", error: error.message });
  }
});

// Actualizar un usuario
router.put('/:id', verifyToken, async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).send({ message: "Usuario no encontrado." });
    }
    const hashedPassword = await bcrypt.hash(password, 8);
    await user.update({ name, email, password: hashedPassword });
    res.json({ message: "Usuario actualizado con éxito." });
  } catch (error) {
    res.status(500).send({ message: "Error al actualizar el usuario.", error: error.message });
  }
});

// Eliminar un usuario
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).send({ message: "Usuario no encontrado." });
    }
    await user.destroy();
    res.send({ message: "Usuario eliminado con éxito." });
  } catch (error) {
    res.status(500).send({ message: "Error al eliminar el usuario", error: error.message });
  }
});

module.exports = router;
