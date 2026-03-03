const logger = require('../utils/logger');
const Search = require('../models/search');

async function handlePostCreated(event) {
  try {
    console.log(event);
    const newSearchPost = new Search({
      postId: event.postId,
      userId: event.userId,
      content: event.content,
      createdAt: event.createdAt,
    });

    await newSearchPost.save();
    logger.info(
      `search post created successfully ${event.postId}: ${newSearchPost._id}`,
    );
  } catch (err) {
    logger.error('Some error occurred while creating a search post', err);
  }
}
async function handlePostDeleted(event) {
  try {
    console.log(event);
    await Search.findOneAndDelete({ postId: event.postId });
  } catch (err) {
    logger.error('Some error occurred while deleting a search post', err);
  }
}
module.exports = { handlePostCreated, handlePostDeleted };
