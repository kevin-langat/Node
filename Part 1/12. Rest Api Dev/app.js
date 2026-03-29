const express = require('express');
const app = express();

// middleware
app.use(express.json());

const books = [
  {
    id: '1',
    title: 'Book 1',
  },
  {
    id: '2',
    title: 'Book 2',
  },
  {
    id: '3',
    title: 'Book 3',
  },
];

// Home page
app.get('/', (req, res) => {
  res.json({
    message: 'welcome to bookstore app',
  });
});

// get all books
app.get('/books', (req, res) => {
  res.json({
    message: 'welcome to bookstore app. This are all the books',
    data: books,
  });
});

// get a single book
app.get('/books/:id', (req, res) => {
  const findTheBook = books.find(
    (book) => parseInt(book.id) === parseInt(req.params.id)
  );

  if (findTheBook) {
    res.status(200).json({
      message: 'The book was found',
      data: findTheBook,
    });
  } else {
    res.status(404).json({
      message: 'Oops the book was not found',
    });
  }
});

// add a new book
app.post('/books/add', (req, res) => {
  if (req.body) {
    if (req.body.id && req.body.title) {
      const booksExists = books.find(
        (book) => book.id === req.body.id || book.title === req.body.title
      );
      if (booksExists) {
        res.status(500).json({
          message: 'The book already exists, please add another one',
        });
      } else {
        books.push(req.body);
        res.status(200).json({
          message: 'Your book was saved successfully',
          data: req.body,
        });
      }
    } else if (req.body.id || req.body.title) {
      res.status(500).json({
        message:
          'One of the details of the book you send is missing. Please double check',
      });
    }
  }
});

// update book details
app.put('/books/update', (req, res) => {
  if (req.body) {
    if (req.body.id && req.body.title) {
      const booksExists = books.find((book) => book.id === req.body.id);
      if (booksExists) {
        const bookIndex = books.findIndex((book) => book.id === booksExists.id);
        if (req.body.title === booksExists.title) {
          res.status(500).json({
            message:
              'Your book was not updated because it has the same information you are trying to update with.',
          });
        } else {
          books[bookIndex].title = req.body.title;
          res.status(200).json({
            message: 'The book was updated successfully',
            data: books[bookIndex],
          });
        }
      } else {
        res.status(500).json({
          message:
            'The book you are trying update does not exists, please add it first',
        });
      }
    } else if (req.body.id || req.body.title) {
      res.status(500).json({
        message:
          'One of the details of the book you send is missing. Please double check',
      });
    }
  }
});

// delete a book
app.delete('/books/delete/:id', (req, res) => {
  const bookIndex = books.findIndex((book) => book.id === req.params.id);
  if (bookIndex !== -1) {
    books.splice(bookIndex, 1);
    res.status(200).json({
      message: 'You book has been deleted successfully',
      data: books,
    });
  } else {
    res.status(500).json({
      message:
        'Could not find the book you want to delete. Please try again 2.59',
    });
  }
});

PORT = 8000;
app.listen(PORT, () => console.log(`App running on port: ${PORT}`));
