const express = require('express');
const {
  registerUser,
  loginUser,
  changePassword,
} = require('../controllers/auth-controller');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

// route to register user
router.post('/register-user', registerUser);
router.post('/login-user', loginUser);
router.post('/change-password', authMiddleware, changePassword);

module.exports = router;
