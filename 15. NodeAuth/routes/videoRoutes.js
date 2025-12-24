const express = require('express');
const { uploadVideoHelper } = require('../helpers/videoHelper');
const uploadVideo = require('../controllers/video-controller');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post(
  '/uploadVideo',
  authMiddleware,
  uploadVideo.single('video'),
  uploadVideoHelper
);

module.exports = router;
