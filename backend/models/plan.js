const mongoose = require('mongoose');

const planSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  features: {
    type: [String], // list of features
    required: true,
  },
  duration: {
    type: Number, // in days (e.g., 30, 90, etc.)
    required: true,
  }
}, { timestamps: true });

module.exports = mongoose.model('Plan', planSchema);
