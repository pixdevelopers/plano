import jwt from 'jsonwebtoken';
import config from 'config';

module.exports = function(req, res, next) {
  const token = req.heaer('x-auth-token');
  if (!token) return res.status(401).send('Access denied. No token provided.');

  try {
    const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
    req.client = decoded;
    next();
  } catch (error) {
    res.status(400).send('Invalid token.');
  }
};
