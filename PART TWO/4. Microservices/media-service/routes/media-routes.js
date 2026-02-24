const express = require('express');
const multer = require('multer');
const logger = require('../utils/logger');
const { authenticateUser } = require('../middleware/auth-middleware');
const { uploadMedia } = require('../controllers/media-controller');
const router = express.Router();
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
}).single('file');

router.post(
  '/upload',
  authenticateUser,
  (req, res, next) => {
    upload(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        logger.error('Multer error while uploading:', err);
        return res.status(400).json({
          message: 'Multer error while uploading',
          error: err.message,
          stack: err.stack,
        });
      } else if (err) {
        logger.error('Uknown error while uploading:', err);
        return res.status(400).json({
          message: 'Uknown error while uploading',
          error: err.message,
          stack: err.stack,
        });
      }
      console.log(req.file);
      if (!req.file) {
        logger.error('No file found');
        return res.status(400).json({
          message: 'No file found',
          success: false,
        });
      }
      next();
    });
  },
  uploadMedia,
);

module.exports = router;
