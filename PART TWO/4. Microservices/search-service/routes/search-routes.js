const express = require('express');
const { authenticateUser } = require('../middleware/auth-middleware');
const { searchPost } = require('../controllers/search-controller');
const search = require('../models/search');

const router = express.Router();

router.use(authenticateUser);

router.post('/posts', searchPost);

module.exports = router;
