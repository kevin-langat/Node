const mongoose = require('mongoose');
const logger = require('../utils/logger');

async function connectToDb() {
  try {
    mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to Mongo DB');
  } catch (error) {
    logger.error('Some error occurred', error);
  }
}
module.exports = { connectToDb };
