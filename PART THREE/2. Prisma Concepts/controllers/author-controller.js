const { createNewAuthor } = require('../services/author-service');

exports.addAuthor = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(500).json({
        message: 'Name is required',
      });
    }
    const author = await createNewAuthor(name);
    res.status(201).json({
      author,
    });
  } catch (err) {
    res.status(500).json({
      message: 'Some err occured',
      err: err.message,
    });
  }
};
