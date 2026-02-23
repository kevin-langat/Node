const mongoose = require('mongoose');
const logger = require('../utils/logger');
async function connectToDb() {
  logger.info('Connection to Mongo started');

  try {
    await mongoose.connect(process.env.MONGO_URI, {
      bufferCommands: false,
      family: 4,
    });
    console.log('Connected to Mongo DB');
    logger.info('Mongo Connected');
  } catch (error) {
    logger.error('Some error occurred', error);
    console.log(error.message);
  }
}
module.exports = { connectToDb };
