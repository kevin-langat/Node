const { uploadToCloudinary } = require('../helpers/cloudinary-helper');
const Image = require('../models/Image');
const userModel = require('../models/userShema');
const cloudinary = require('../config/cloudinary');
const fs = require('fs');
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

    fs.unlinkSync(req.file.path);

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
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 2;
  const skip = (page - 1) * limit;
  const sortBy = req.query.sortOrder || 'createdAt';
  const sortOrder = req.query.sortOrder === 'asc' ? 1 : -1;
  const totalImages = await Image.countDocuments();
  const totalPages = Math.ceil(totalImages / limit);

  const sortObj = {};
  sortObj[sortBy] = sortOrder;
  const images = await Image.find().sort(sortObj).skip(skip).limit(limit);
  console.log(sortObj);

  if (!images) {
    return res.status(404).json({
      success: false,
      message: 'There are no images at the moment',
    });
  }

  res.status(200).json({
    success: true,
    message: 'All Images',
    currentPage: page,
    totalPages: totalPages,
    totalImages: totalImages,
    data: images,
  });
}

async function deleteImage(req, res) {
  try {
    const { id } = req.params;
    const { userId } = req.userInfo;
    const image = await Image.findById(id);

    // if the image is not present
    if (!image) {
      return res.status(404).json({
        success: false,
        message: 'This image is not available',
      });
    }
    // preventing deletion by forbidden users
    if (userId !== image.uploadedBy.toString()) {
      return res.status(403).json({
        success: false,
        message: 'You are forbidden from deleting this image',
      });
    }

    // delete an image from cloudinary
    await cloudinary.uploader.destroy(image.publicId);
    // delete from mongo db
    await Image.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: 'Image deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Some error occurred',
      error,
    });
  }
}

module.exports = { uploadImage, fetchAllImages, deleteImage };
