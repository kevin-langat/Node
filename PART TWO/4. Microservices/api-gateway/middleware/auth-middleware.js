const logger = require('../utils/logger');
const jwt = require('jsonwebtoken');

function validateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    logger.warn('Access attempt without valid token!');
    return res.status(401).json({
      success: false,
      message: 'Authentication required',
    });
  }

  jwt.verify(token, 'MY_JWT_SECRET', (err, user) => {
    if (err) {
      logger.warn('Invalid Token');
      return res.status(401).json({
        success: false,
        message: 'Invalid Token',
      });
    }
    req.user = user;
    next();
  });
}

module.exports = { validateToken };
