const mongoose = require('mongoose');

const mediaSchema = new mongoose.Schema(
  {
    publicId: {
      type: String,
      reqired: true,
    },
    originalName: {
      type: String,
      reqired: true,
    },
    mimeType: {
      type: String,
      reqired: true,
    },
    url: {
      type: String,
      reqired: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      reqired: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('Media', mediaSchema);
