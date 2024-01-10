const jwt = require('jsonwebtoken');
const Secret_key = process.env.Secret_key


const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization'];


  if (!token) {
    return res.status(401).json({ message: 'Unauthorized, token not available' });
  }

  jwt.verify(token, Secret_key, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Unauthorized, Invalid token' });
    }
    req.user = user;
    next();
  });
};

module.exports = authenticateToken;
