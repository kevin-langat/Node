const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');
const uploadMiddleware = require('../middlewares/image-middleware');
const {
  uploadImage,
  fetchAllImages,
} = require('../controllers/image-controller');
const imageUploadPractise = require('../controllers/ImageUPractise');
const imageUHelper = require('../helpers/ImageUHelper');

const router = express.Router();

router.post(
  '/image-upload',
  authMiddleware,
  adminMiddleware,
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

module.exports = router;
