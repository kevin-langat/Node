const express = require('express');
const authorController = require('../controllers/author-controller');
const router = express.Router();

router.post('/create-author', authorController.addAuthor);

module.exports = router;
