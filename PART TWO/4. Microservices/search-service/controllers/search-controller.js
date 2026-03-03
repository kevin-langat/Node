const logger = require('../utils/logger');
const Search = require('../models/search');
async function searchPost(req, res) {
  logger.info('Search endpoint hit');
  try {
    const { query } = req.query;

    const result = await Search.find(
      {
        $text: { $search: query },
      },
      {
        score: { $meta: 'textScore' },
      },
    )
      .sort({ score: { $meta: 'textScore' } })
      .limit(10);

    res.json(result);
  } catch (err) {
    logger.error('Some error occurred while searching post');
    res.status(500).json({
      success: false,
      message: 'Some error occurred while searching post',
      err,
    });
  }
}

module.exports = { searchPost };
