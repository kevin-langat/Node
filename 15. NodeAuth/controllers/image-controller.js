const { uploadToCloudinary } = require('../helpers/cloudinary-helper');
const Image = require('../models/Image');

async function uploadImage(req, res) {
  try {
    // check if the  file is missing
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Image cannot be empty. Please upload a file',
      });
    }

    // upload to cloudinary
    const { url, publicId } = await uploadToCloudinary(req.file.path);
    // store the image and image url in the mongo db
    const newlyUploadedImage = new Image({
      url,
      publicId,
      uploadedBy: req.userInfo.userId,
    });
    await newlyUploadedImage.save();

    res.status(201).json({
      success: true,
      message: 'Image uploaded successfully',
      image: newlyUploadedImage,
    });
  } catch (error) {
    res.status(500).json({
      succes: false,
      message: 'There was a problem in uploading your image',
      error: error,
    });
  }
}

// fetch all th images

async function fetchAllImages(req, res) {
  const images = await Image.find({});

  if (!images) {
    return res.status(404).json({
      success: false,
      message: 'There are not images at the moment',
    });
  }

  res.status(200).json({
    success: true,
    message: 'All Images',
    data: images,
  });
}

module.exports = { uploadImage, fetchAllImages };
