const { createNewAuthor, deleteAuthor } = require('../services/author-service');

exports.addAuthor = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({
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

exports.deleteAuthorById = async function (req, res) {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(500).json({
        message: 'Id is required',
      });
    }

    const author = await deleteAuthor(parseInt(id));
    res.status(200).json({
      message: `Author of id ${id} deleted successfully`,
      author,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Some err occured',
      err: err.message,
    });
  }
};
