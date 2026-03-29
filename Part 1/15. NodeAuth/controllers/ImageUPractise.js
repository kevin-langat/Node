const multer = require('multer');


const uploadImageTest = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploadsPractise/');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + "-" + file.originalname);
  },
});
module.exports = multer({
  storage: uploadImageTest,
  limits: {
    fileSize: 5 * 1024 * 1024
  }
});