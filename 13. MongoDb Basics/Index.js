const express = require('express');
const mongoose = require('mongoose');

// connecting to mongodb
mongoose
  .connect(
    'mongodb+srv://kevinkipkirui301_db_user:KevinLangat@mongobasicscluster.iservcm.mongodb.net/'
  )
  .then(() => console.log('Mongo Db connected successfully'))
  .catch((err) => console.log('Some Error occured:', err));

// create a user schema
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number,
  isActive: Boolean,
  tags: [String],
  createdAt: { type: Date, default: Date.now },
});

// store the schema in a collection
const User = mongoose.model('User', userSchema);

async function runQueryExamples() {
  try {
    // add user's details
    const newUser = await User.create({
      name: 'Mike Tyson',
      email: 'tysonmike@gmail.com',
      age: 53,
      isActive: true,
      tags: ['Proffesional Boxer'],
    });
    console.log('New user created successfully===>', newUser);

    // get all users
    const getAllUsers = await User.find({});
    console.log('All the users available now: ===>', getAllUsers);

    // get users with isActive being false
    const getUserWithIsActiveFalse = await User.find({ isActive: false });
    console.log(
      'User with the field isActive being false:===>',
      getUserWithIsActiveFalse
    );

    // using findOne to get the first user that matches the provided field
    const findFirstUser = await User.findOne({ name: 'James Wynn' });
    console.log('first user with the name James Wynn===>', findFirstUser);

    // get user by id (getting the last created user)
    const lastCreatedUser = await User.findById(newUser._id);
    console.log('Last created user with===>', lastCreatedUser);

    // getting all selected fields of users
    const selectedFields = await User.find().select('email name');
    console.log('Getting all user with the defined fields', selectedFields);
    // excluding the _id field
    const exludingIdFields = await User.find().select('email name -_id');
    console.log('Getting all user with the defined fields', exludingIdFields);

    // Limiting and skipping Users e.g. when creating pagination of data
    const limitUsers = await User.find().limit(5).skip(1);
    console.log('Limited users, and skipping the first user ===> ', limitUsers);

    // sorting users according to age (from older to younger users) criteria
    const sortUsersAccordingToAge = await User.find().sort({ age: -1 });
    console.log('Sorted users from old to young', sortUsersAccordingToAge);
    // sorting users according to age (from older to younger users) criteria
    const youngToOldUsers = await User.find().sort({ age: 1 });
    console.log('Sorted users from young to old', youngToOldUsers);

    // count documents where the isActive field is true
    const countFieldsisActiveBeingTrue = await User.countDocuments({
      isActive: true,
    });
    console.log(
      'Number of Fields with isActive Being True',
      countFieldsisActiveBeingTrue
    );

    // deleting a user based on _id
    const deletedUser = await User.findByIdAndDelete(newUser._id);
    console.log('Deleted User===>', deletedUser);

    // Updating User
    const updatedUser = await User.findByIdAndUpdate(
      '693bbba4abfae0c29ca9961c',
      {
        $set: { age: 55 },
        $push: { tags: 'Fighter' },
      },
      { new: true }
    );

    console.log(
      'This the newly updated user',
      await User.findById('693bbba4abfae0c29ca9961c')
    );
  } catch (error) {
    console.log('Some error  occurred:', error);
  }
}

runQueryExamples();
