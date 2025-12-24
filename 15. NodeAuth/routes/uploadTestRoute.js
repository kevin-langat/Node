const express = require('express');
const upload = require('../controllers/uploadTest');
const router = express.Router();

router.post('/upload-img', upload.single('file'), (req, res) => res.send('uploaded'));

module.exports = router;