const express = require('express');
const {
  getAllBooks,
  getASingleBook,
  createANewBook,
  updateBook,
  deleteABook,
} = require('../controllers/books-controller');

// express router
const router = express.Router();

// all routes related to books
// get all books in db route
router.get('/get-books', getAllBooks);

// get a single books
router.get('/get-book/:id', getASingleBook);

// create a new book
router.post('/new-book', createANewBook);

// update a book
router.put('/update-book/:id', updateBook);

// delete a book
router.delete('/delete-book/:id', deleteABook);

module.exports = router;
