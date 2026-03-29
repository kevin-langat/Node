const mongoose = require('mongoose');

// Books schema
const booksSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Book title is required'],
    trim: true,
    maxLength: [50, 'Book title cannot exceed 50 characters'],
  },
  author: {
    type: String,
    required: [true, 'Author name is required'],
    trim: true,
  },
  year: {
    type: Number,
    required: [true, ' Publication year is required'],
    min: [1940, 'Year cannot be a value less than 1970'],
    max: [
      new Date().getFullYear(),
      'Year cannot be greater that the current year',
    ],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model('Books', booksSchema);
