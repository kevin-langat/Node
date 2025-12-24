const Book = require('../models/Book');

// functions to get all books
async function getAllBooks(req, res) {
  try {
    const allBooks = await Book.find({});
    res.status(200).json({
      message: 'All books here',
      data: allBooks,
    });
  } catch (error) {
    res.status(500).json({
      message: 'An error occured. Please try again',
      error: error,
    });
  }
}
// functions to get a single Book
async function getASingleBook(req, res) {
  try {
    const id = req.params.id;
    const book = await Book.findById(id);
    console.log(book);
    if (!book) {
      console.log('not found book');
      res.status(404).json({
        success: false,
        message:
          "Couldn't find the book you are requesting, Try with another id",
      });
    }
    res.status(200).json({
      message: 'The following book was found',
      error: book,
    });
  } catch (error) {
    res.status(500).json({
      message: 'An error occured. Please try again',
      error: error,
    });
  }
}
// functions to create a new book
async function createANewBook(req, res) {
  try {
    const newBook = req.body;
    const newlyCreatedBook = await Book.create(newBook);

    if (newlyCreatedBook) {
      res.status(200).json({
        message: 'New Book created successfully',
        data: newlyCreatedBook,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Some error occured while creating a book',
      data: error,
    });
  }
}
// functions to update a book
async function updateBook(req, res) {
  try {
    const id = req.params.id;
    const updatedBook = req.body;
    const book = await Book.findByIdAndUpdate(id, updatedBook, { new: true });

    if (!book) {
      res.status(404).json({
        success: false,
        message:
          "Couldn't find the book you want to update, Try with another id",
      });
    }
    res.status(200).json({
      message: 'The following book was updated successfully',
      error: book,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Some error occured while updating the book',
      data: error,
    });
  }
}

// functions to delete a book
async function deleteABook(req, res) {
  try {
    const id = req.params.id;
    const book = await Book.findByIdAndDelete(id);

    if (!book) {
      res.status(404).json({
        success: false,
        message:
          "Couldn't find the book you are requesting, Try with another id",
      });
    }
    res.status(200).json({
      message: 'The following book was deleted successfully',
      error: book,
    });
  } catch (error) {
    res.status(500).json({
      message: 'An error occured. Please try again',
      error: error,
    });
  }
}

module.exports = {
  deleteABook,
  updateBook,
  createANewBook,
  getASingleBook,
  getAllBooks,
};
