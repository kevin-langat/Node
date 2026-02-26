const cloudinary = require('cloudinary').v2;
const logger = require('./logger');

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

async function uploadMediaToCloudinary(file) {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader
      .upload_stream(
        {
          resource_type: 'auto',
        },
        (err, result) => {
          if (err) {
            logger.error('Error while uploading to cloudinary', err);
            reject(err);
          } else {
            resolve(result);
          }
        },
      )
      .end(file.buffer);
  });
}

async function deleteMediaFromCloudinary(publicId) {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    logger.info('Media deleted from the cloudinary', publicId);
    return result;
  } catch (error) {
    logger.error('Some error occurred while deleteing the media', error);
  }
}

module.exports = { uploadMediaToCloudinary, deleteMediaFromCloudinary };
