const logger = require('../utils/logger');
const validateRegistration = require('../utils/validations');
const User = require('../models/user');

// user registration
async function refisterUser(req, res) {
  logger.info('Registration started for a user');
  try {
    const { username, email, password } = req.body;
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
    logger.info('User 3444 saved success ');
  } catch (error) {}
}
