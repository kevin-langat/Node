const Author = require('../Models/Author');

async function createAuthor(req, res) {
  try {
    const { name, bio } = req.body;
    const newlyCreatedAuthor = new Author({
      name,
      bio,
    });
    await newlyCreatedAuthor.save();

    res.status(201).json({
      success: true,
      message: 'New author created',
      newlyCreatedAuthor,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Some error Occurred',
      error,
    });
  }
}

module.exports = { createAuthor };
