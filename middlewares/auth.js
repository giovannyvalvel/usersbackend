const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"] || req.headers["authorization"]; // Express headers son case insensitive

  if (!token) {
    return res.status(403).send({ message: "Se requiere un token para autenticar." });
  }

  if (token.startsWith('Bearer ')) {
    // Remueve 'Bearer ' del string del token
    token = token.slice(7, token.length);
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "No autorizado." });
    }
    req.userId = decoded.id;
    next();
  });
};

module.exports = verifyToken;
