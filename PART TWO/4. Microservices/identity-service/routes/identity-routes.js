const express = require('express');
const {
  registerUser,
  loginUser,
  logoutUser,
  refreshTokenController,
} = require('../controllers/identity-controller');

const Router = express.Router();

Router.post('/register-user', registerUser);
Router.post('/login-user', loginUser);
Router.post('/refresh-token', refreshTokenController);
Router.post('/logout-user', logoutUser);

module.exports = Router;
