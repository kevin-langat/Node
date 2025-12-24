const { url } = require('../config/cloudinary');
const videoSchema = require('../models/videoSchema');
const videoModels = require('../models/videoSchema');

async function uploadVideoHelper(req, res) {
  try {
    const videoUrl = req.file.path;
    const publicId = req.file.filename;
    const newlyUploadedVideo = new videoSchema({
      url: videoUrl,
      publicId: publicId,
      uploadedBy: req.userInfo.userId,
    });
    await newlyUploadedVideo.save();

    res.status(200).json({
      message: 'Video uploaded successfully!',
      url: videoUrl,
      id: publicId,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = { uploadVideoHelper };
