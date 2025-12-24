const UserModel = require('../models/userShema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
// register user
async function registerUser(req, res) {
  try {
    const { userName, email, password, role } = req.body;

    // checkinng first if the user exists in our db
    const findUser = await UserModel.findOne({
      $or: [{ userName }, { email }],
    });
    console.log(findUser);
    if (findUser) {
      res.status(200).json({
        success: false,
        message: 'User already exists, please login',
      });
    }

    // using bcrypt to hash password before storing
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUserWitHashedPass = new UserModel({
      userName,
      email,
      password: hashedPassword,
      role: role || 'user',
    });

    // storing the user with hashed password
    await newUserWitHashedPass.save();
    if (newUserWitHashedPass) {
      res.status(200).json({
        message: 'User created successfully',
        data: newUserWitHashedPass,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: 'Some error occured',
      error: error,
    });
  }
}
// login controller
async function loginUser(req, res) {
  try {
    // find if the current user exists in the db
    const { userName, password } = req.body;
    const user = await UserModel.findOne({ userName });
    console.log(user);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User does not exist, Please register',
      });
    }
    // find if the pass matches
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(404).json({
        success: false,
        message: 'Incorrect Password',
      });
    }

    // sending a token back to keep the user logged in if the credentials are true
    const accessToken = jwt.sign(
      {
        userId: user._id,
        userName: user.userName,
        role: user.role,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: '30min' }
    );

    res.status(200).json({
      message: 'Logged in successfully',
      accessToken: accessToken,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Some error occured',
      error: error,
    });
  }
}

// change password
async function changePassword(req, res) {
  try {
    const { oldPassword, newPassword } = req.body;
    const { userId } = req.userInfo;
    // find the current user
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'The user does not exists',
      });
    }
    const isPasswordMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        success: false,
        message: 'The password does not match. Please try again',
      });
    }

    // hash the new password before storing
    const salt = await bcrypt.genSalt(10);
    const newHashedPassword = await bcrypt.hash(newPassword, salt);

    // update password in db
    user.password = newHashedPassword;
    user.save();

    res.status(200).json({
      success: true,
      message: 'Password updated successfully',
      newUser: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Some error occured',
      error,
    });
  }
}

module.exports = {
  registerUser,
  loginUser,
  changePassword,
};
