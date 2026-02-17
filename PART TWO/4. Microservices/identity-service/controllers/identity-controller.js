const logger = require('../utils/logger');
const validateRegistration = require('../utils/validations');
const User = require('../models/user');
const { generateTokens } = require('../utils/generateTokens');

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
    logger.warn('User saved successfully');
  }
}
module.exports = { registerUser };
