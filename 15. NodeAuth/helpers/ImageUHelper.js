const cloudinary = require('../config/cloudinary');
const Image = require('../models/Image');
const mongoose = require('mongoose');
const userSchema = require('../models/userShema');
async function imageUHelper(req, res) {
  try {
    if (!req.file) {
      return res.status(500).json({
        success: false,
        message: 'File required',
      });
    }

    const uploadedBy = await userSchema.findById(req.params.id);
    if (!uploadedBy) {
      return res.status(500).json({
        success: false,
        message: 'User uploading the image does not exists',
      });
    }

    const { url, public_id } = await cloudinary.uploader.upload(req.file.path);
    const newlyUploadedImg = new Image({
      url: url,
      publicId: public_id,
      uploadedBy: req.params.id,
    });
    await newlyUploadedImg.save();

    res.status(201).json({
      success: true,
      message: 'The image was successfully uploaded to cloudinary',
      data: {
        url,
        public_id,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: error,
    });
  }
}

module.exports = imageUHelper;
