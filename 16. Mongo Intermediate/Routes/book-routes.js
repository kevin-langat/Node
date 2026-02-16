const express = require('express');
const { createAuthor } = require('../Controllers/author-controller');
const { createBook, getABook } = require('../Controllers/book-controller');

const router = express.Router();

router.post('/create-book', createBook);
router.get('/get-book/:id', getABook);
router.post('/create-author', createAuthor);

module.exports = router;
