const { uploadMediaToCloudinary } = require('../utils/cloudinary');
const logger = require('../utils/logger');
const Media = require('../models/media');
async function uploadMedia(req, res) {
  console.log(req.file);
  logger.info('Starting media upload');
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({
        success: false,
        message:
          "Couldn't find the file you are trying to upload. Please try again.",
      });
    }
    const { originalname, mimetype, buffer } = file;
    const userId = req.user.userId;
    logger.info(`file details: name-${originalname}, type:${mimetype}, `);

    const { public_id, secure_url } = await uploadMediaToCloudinary(file);
    logger.info(
      `Upload to cloudinary successfull. publicId->${public_id}, secureUrl->${secure_url}`,
    );

    const newlyCreatedMedia = new Media({
      publicId: public_id,
      originalName: originalname,
      mimeType: mimetype,
      url: secure_url,
      userId,
    });

    await newlyCreatedMedia.save();

    res.status(201).json({
      success: true,
      mediaId: newlyCreatedMedia._id,
      url: newlyCreatedMedia.url,
    });
  } catch (err) {
    logger.error('Some error occurred while uploading your media');
    res.status(500).json({
      success: false,
      message: 'Some error occurred while uploading your media',
      err,
    });
  }
}

module.exports = { uploadMedia };
