const express = require('express');
const adminMiddleware = require('../middlewares/adminMiddleware');
const adminController = require('../controllers/admin-controller');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/adminHomePage', authMiddleware, adminMiddleware, adminController);

module.exports = router;
