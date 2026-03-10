const authorService = require('../services/author-service');

exports.addAuthor = async (req, res) => {
  try {
    const { name } = req.body;
    const author = authorService.addAuthor(name);

    res.status(201).json(author);
  } catch (err) {
    res.status(500).json({
      message: 'Some err occured',
      err,
    });
  }
};
