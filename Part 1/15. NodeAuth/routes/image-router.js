const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const uploadMiddleware = require('../middlewares/image-middleware');
const {
  uploadImage,
  fetchAllImages,
  deleteImage,
} = require('../controllers/image-controller');
const imageUploadPractise = require('../controllers/ImageUPractise');
const imageUHelper = require('../helpers/ImageUHelper');

const router = express.Router();

router.post(
  '/image-upload',
  authMiddleware,
  uploadMiddleware.single('image'),
  uploadImage
);

router.post(
  '/uploadPractise/:id',
  imageUploadPractise.single('file'),
  imageUHelper
);

// fetch all images
router.get('/get-all-images', authMiddleware, fetchAllImages);

// delete and image
router.delete('/delete-image/:id', authMiddleware, deleteImage);

module.exports = router;
