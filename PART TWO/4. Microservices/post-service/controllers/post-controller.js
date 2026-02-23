const logger = require('../utils/logger');
const Post = require('../models/post');
const { validateCreatePost } = require('../utils/validation');

async function invalidateCachedPosts(req, input) {
  const cachedKey = `post:${input}`;
  await req.redisClient.del(cachedKey);
  const keys = await req.redisClient.keys('posts:*');
  if (keys.length > 0) {
    await req.redisClient.del(keys);
  }
}

async function createPost(req, res) {
  try {
    const { content, mediaIds } = req.body;

    const { error } = validateCreatePost(req.body);
    if (error) {
      return res.status(400).json({
        succes: false,
        message: 'An error occurred while616 creating your post',
        error: error.message,
      });
    }
    const newlyCreatedPost = new Post({
      user: req.user.userId,
      content,
      mediaIds: mediaIds || [],
    });

    await newlyCreatedPost.save();
    await invalidateCachedPosts(req, newlyCreatedPost._id.toString());
    res.status(201).json({
      success: true,
      message: 'Post created successfully',
      newlyCreatedPost,
    });
  } catch (error) {
    logger.error('Some error occurred while creating a post');
    res.status(500).json({
      success: false,
      message: 'Some error occurred while creating a post',
      error: error.message,
    });
  }
}

async function getAllPosts(req, res) {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const startIndex = (page - 1) * limit;
    const cacheKey = `posts:${page}:${limit}`;
    const cachedPosts = await req.redisClient.get(cacheKey);

    if (cachedPosts) {
      return res.json(JSON.parse(cachedPosts));
    }

    const posts = await Post.find({})
      .sort({ createdAt: -1 })
      .skip(startIndex)
      .limit(limit);

    const totalNoOfPosts = await Post.countDocuments();

    const results = {
      posts,
      currentpage: page,
      totalPages: Math.ceil(totalNoOfPosts / limit),
      totalPosts: totalNoOfPosts,
    };

    // save posts in redis cached
    await req.redisClient.setex(cacheKey, 300, JSON.stringify(results));

    res.json(results);
  } catch (error) {
    logger.error('Some error occurred while getting all posts');
    res.status(500).json({
      success: false,
      message: 'Some error occurred while getting all posts',
      error: error.message,
    });
  }
}

async function updatePost(req, res) {
  try {
  } catch (error) {
    logger.error('Some error occurred while creating a post');
    res.status(500).json({
      success: false,
      message: 'Some error occurred while creating a post',
      error,
    });
  }
}

async function getPost(req, res) {
  try {
    const postId = req.params.id;
    const cacheKey = `post:${postId}`;
    const cachedPost = await req.redisClient.get(cacheKey);
    if (cachedPost) {
      return res.json(JSON.parse(cachedPost));
    }

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({
        success: false,
        messsage: 'The post was not found',
      });
    }

    await req.redisClient.setex(cacheKey, 3600, JSON.stringify(post));

    res.json(post);
  } catch (error) {
    logger.error('Some error occurred while getting a post');
    res.status(500).json({
      success: false,
      message: 'Some error occurred while getting a post',
      error,
    });
  }
}

async function deletePost(req, res) {
  try {
    const post = await Post.findOneAndDelete({
      _id: req.params.id,
      user: req.user.userId,
    });
    if (!post) {
      return res.status(404).json({
        success: false,
        messsage: 'The post was not found',
      });
    }

    await invalidateCachedPosts(req, req.params.id);
    res.json({
      success: true,
      message: 'Post deleted successfully',
    });
  } catch (error) {
    logger.error('Some error occurred while 638deleting a post');
    res.status(500).json({
      success: false,
      message: 'Some error occurred while deleting a post',
      error,
    });
  }
}

module.exports = { createPost, updatePost, getAllPosts, getPost, deletePost };
