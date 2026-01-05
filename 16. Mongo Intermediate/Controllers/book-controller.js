const Author = require('../Models/Author');
const Book = require('../Models/Book');

async function createBook(req, res) {
  try {
    const { title, author } = req.body;
    const newlyCreatedBook = new Book({
      title,
      author,
    });
    await newlyCreatedBook.save();

    res.status(201).json({
      success: true,
      message: 'Book created',
      newlyCreatedBook,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Some error occurred',
      error,
    });
  }
}

async function getABook(req, res) {
  try {
    const id = req.params.id;
    const book = await Book.findById(id).populate('author');

    if (!book) {
      return req.status(404).json({
        success: false,
        message: 'The book was not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'The book was found',
      book,
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: 'Some error occurred',
      e,
    });
  }
}

module.exports = { createBook, getABook };
