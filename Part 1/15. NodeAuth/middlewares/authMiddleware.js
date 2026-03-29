require('dotenv').config();
const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
  const authHeader = req.headers['authorization'];

  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Token Missing. Token is required',
    });
  }

  // decoding the token:
  try {
    const decodedTokenInfo = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.userInfo = decodedTokenInfo;
    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Some error occurred. Please try again later',
      error: error,
    });
  }
}

module.exports = authMiddleware;
