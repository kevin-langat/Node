const express = require('express');
const { mainDashboard } = require('../controllers/dashboard-controller');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/main', authMiddleware, mainDashboard);

module.exports = router;
