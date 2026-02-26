const logger = require('../utils/logger');
const Media = require('../models/media');
const { deleteMediaFromCloudinary } = require('../utils/cloudinary');
async function handlePostDeleted(event) {
  const { postId, mediaIds } = event;
  try {
    const mediaToDelete = await Media.find({ _id: { $in: mediaIds } });
    console.log(mediaToDelete);
    for (const media of mediaToDelete) {
      await deleteMediaFromCloudinary(media.publicId);
      await Media.findByIdAndDelete(media._id);
      logger.info(
        `Deleted media ${media._id} associated with the post ${postId}`,
      );
    }
    logger.info(`Process deletion for post id ${postId}`);
  } catch (error) {
    logger.error('Some error occurred while deleting media ');
  }
}
module.exports = { handlePostDeleted };
