const express = require('express');
const {
  createPost,
  getAllPosts,
  getPost,
  deletePost,
} = require('../controllers/post-controller');
const { authenticateUser } = require('../middleware/auth-middleware');

const router = express.Router();
router.use(authenticateUser);

router.post('/create-new-post', createPost);
router.get('/get-all-Posts', getAllPosts);
router.get('/get-post/:id', getPost);
router.delete('/delete-post/:id', deletePost);

module.exports = router;
