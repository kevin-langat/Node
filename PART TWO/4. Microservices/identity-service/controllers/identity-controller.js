const logger = require('../utils/logger');
const { validateRegistration, validateLogin } = require('../utils/validations');
const User = require('../models/user');
const { generateTokens } = require('../utils/generateTokens');
const RefreshToken = require('../models/refresh-token');
// user registration
async function registerUser(req, res) {
  logger.info('Registration started for a user');
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required',
      });
    }
    const { error } = validateRegistration(req.body);

    if (error) {
      logger.warn('Validation error', error.details[0].message);
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }

    let user = await User.findOne({ $or: [{ email }, { username }] });

    if (user) {
      logger.warn('User already exists');
      return res.status(400).json({
        success: false,
        message: 'User already exists',
      });
    }

    user = new User({
      username,
      email,
      password,
    });
    await user.save();
    logger.warn('User saved successfully');
    const { accessToken, refreshToken } = await generateTokens(user);

    res.status(201).json({
      success: true,
      message: 'User saved successfully',
      accessToken,
      refreshToken,
    });
  } catch (error) {
    logger.error('Some error occurred');
    res.status(400).json({
      success: false,
      message: 'Some error occurred',
      error: error.message,
    });
  }
}

// user login
async function loginUser(req, res) {
  logger.info('login endpoint hit');
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required',
      });
    }
    const { error } = validateLogin(req.body);
    console.log(email, password);
    if (error) {
      logger.warn('Validation error', error.details[0].message);
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }
    const user = await User.findOne({ email });

    if (!user) {
      logger.warn('User does not exist');
      return res.status(404).json({
        success: false,
        message: 'User does not exist',
      });
    }
    const isValidPass = await user.comparePasswords(password);

    if (!isValidPass) {
      logger.warn('Incorrrect password');
      return res.status(400).json({
        success: false,
        message: 'Incorrrect password',
      });
    }

    const { accessToken, refreshToken } = await generateTokens(user);

    res.status(200).json({
      accessToken,
      refreshToken,
      userId: user._id,
    });
  } catch (error) {
    logger.error('Some error occurred');
    res.status(400).json({
      success: false,
      message: 'Some error occurred',
      error: error.message,
    });
  }
}
// refresh token
async function refreshTokenController(req, res) {
  logger.info('refreshToken endpoint hit');
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      logger.warn('Refresh token missing');
      return res.status(400).json({
        success: false,
        message: 'Refresh token missing',
      });
    }
    const storedToken = await RefreshToken.findOne({ token: refreshToken });
    if (!storedToken || storedToken.expiresAt < new Date()) {
      logger.warn('Invalid or expired refresh token');
      return res.status(401).json({
        success: false,
        message: 'Invalid or expired refresh token',
      });
    }

    const user = await User.findById(storedToken.user);
    if (!user) {
      logger.warn('User not found');
      return res.status(401).json({
        success: false,
        message: 'User not found',
      });
    }
    const { accessToken: newAccessToken, refreshToken: neRefreshToken } =
      await generateTokens(user);

    // delete token
    await RefreshToken.deleteOne({ _id: storedToken._id });

    res.json({
      accessToken: newAccessToken,
      refreshToken: neRefreshToken,
    });
  } catch (error) {
    logger.error('Some error occurred');
    res.status(400).json({
      success: false,
      message: 'Some error occurred',
      error,
    });
  }
}

// logout user
async function logoutUser(req, res) {
  logger.info('refreshToken endpoint hit');
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      logger.warn('Refresh token missing');
      return res.status(400).json({
        success: false,
        message: 'Refresh token missing',
      });
    }
    await RefreshToken.deleteOne({ token: refreshToken });

    logger.info('Refresh token deleted');
    res.json({
      success: false,
      message: 'Logged out successfully',
    });
  } catch (error) {
    logger.error('Logout error');
    res.status(400).json({
      success: false,
      message: 'Some logout error occurred',
      error,
    });
  }
}
module.exports = {
  registerUser,
  loginUser,
  refreshTokenController,
  logoutUser,
};
