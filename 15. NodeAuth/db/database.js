require('dotenv').config();
const mongoose = require('mongoose');

async function connectToMongo() {
  try {
    mongoose.connect(process.env.MONGO_URI);
    console.log('Mongo Db Connected Successfully');
  } catch (error) {
    console.log(error);
  }
}
module.exports = connectToMongo;
