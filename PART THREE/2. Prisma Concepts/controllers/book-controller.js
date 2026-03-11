const bookService = require('../services/book-service');
exports.addBook = async (req, res) => {
  try {
    const { title, publishedDate, authorId } = req.body;
    if (!title || !publishedDate || !authorId) {
      return res.status(400).json({
        message: 'All fields are required',
      });
    }
    const book = await bookService.addBook(
      title,
      new Date(publishedDate),
      authorId,
    );

    res.status(201).json({
      message: 'Book created successfully',
      book,
    });
  } catch (error) {
    res.status(500).json({
      err: error.message,
    });
  }
};

exports.getBooks = async (req, res) => {
  try {
    const books = await bookService.getAllBooks();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({
      err: error.message,
    });
  }
};
exports.getBookById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        message: 'Id is required',
      });
    }
    const book = await bookService.getBookById(parseInt(id));
    if (!book) {
      return res.status(400).json({
        message: "Couldn't get the book you are trying to find",
      });
    }
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({
      err: error.message,
    });
  }
};

exports.updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const { title } = req.body;
    if ((!id, !title)) {
      return res.status(400).json({
        message: 'All fields are required',
      });
    }
    const updatedBook = await bookService.updateBook(parseInt(id), title);
    res.status(200).json({
      message: 'Book updated successfully',
      updatedBook,
    });
  } catch (error) {
    res.status(500).json({
      err: error.message,
    });
  }
};
exports.deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        message: 'Id is missing',
      });
    }
    await bookService.deleteBook(parseInt(id));
    res.status(200).json({
      message: `Book of id ${id} deleted successfully`,
    });
  } catch (error) {
    res.status(500).json({
      err: error.message,
    });
  }
};
