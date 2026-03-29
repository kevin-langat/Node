require('dotenv').config();
const mongoose = require('mongoose');

async function connectToDb() {
  try {
    await mongoose.connect(process.env.MONGO_DB_CONNECTION_STRING);
    console.log('Mongo Db connected');
  } catch (error) {
    console.log('An error occured:', error);
    process.exit(1);
  }
}

module.exports = connectToDb;
