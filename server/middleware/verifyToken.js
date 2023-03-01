const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    console.log(req.headers);
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'Acceso no autorizado' });
  }
  jwt.verify(token.split(' ')[1], process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Token inválido!' });
    }
    req.user = decoded.user;
    next();
  });
};

module.exports = verifyToken;