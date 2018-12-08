
module.exports = function(req, res, next) {
  // const token = req.heaer('x-auth-token');
  // if (!token) return res.status(401).send('Access denied. No token provided.');
  // if (!req.user)
  //   return res.status(401).send('Access denied. No token provided.');
  if (!req.user.isStaff) return res.status(403).send('Access denied.');
  next();
};
