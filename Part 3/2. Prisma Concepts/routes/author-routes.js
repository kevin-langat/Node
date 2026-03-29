const express = require('express');
const authorController = require('../controllers/author-controller');
const router = express.Router();

router.post('/create-author', authorController.addAuthor);
router.delete('/delete-author/:id', authorController.deleteAuthorById);

module.exports = router;
