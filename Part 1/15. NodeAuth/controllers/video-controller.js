const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
const cloudinaryConfig = require('../config/cloudinary');

const storage = new CloudinaryStorage({
  cloudinary: cloudinaryConfig,
  params: {
    folder: 'uploadsPractise/',
    resource_type: 'video',
    allowed_formats: ['mp4', 'mov', 'avi'],
  },
});

module.exports = multer({
  storage: storage,
});
