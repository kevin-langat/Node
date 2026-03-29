const cloudinary = require('../config/cloudinary');

async function uploadToCloudinary(filePath) {
  try {
    const result = await cloudinary.uploader.upload(filePath);
    return {
      url: result.secure_url,
      publicId: result.public_id,
    };
  } catch (error) {
    console.log('Error while uploading to cloudinary', error);
    throw new Error();
  }
}

module.exports = {
  uploadToCloudinary,
};
