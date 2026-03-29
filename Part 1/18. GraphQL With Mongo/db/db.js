const mongoose = require('mongoose');

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Mongo db connected successfully');
  } catch (error) {
    console.log('Some error occurres while connecting to Mongo', error);
  }
}
module.exports = { connectDB };
