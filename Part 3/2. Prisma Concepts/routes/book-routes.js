const express = require('express');
const bookController = require('../controllers/book-controller');
const router = express.Router();

router.post('/create-book', bookController.addBook);
router.get('/get-all-books', bookController.getBooks);
router.get('/get-book/:id', bookController.getBookById);
router.put('/update-book/:id', bookController.updateBook);
router.delete('/delete-book/:id', bookController.deleteBook);

module.exports = router;
