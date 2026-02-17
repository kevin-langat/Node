const express = require('express');
const { registerUser } = require('../controllers/identity-controller');

const Router = express.Router();

Router.post('/register-user', registerUser);

module.exports = Router;
