const mongoose = require('mongoose');

const PlanSchema = new mongoose.Schema({
  name: {
    type: String,
    enum: ['Basic', 'Pro', 'Premium'],
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  duration: {
    type: Number, // In months
    required: true
  },
  features: {
    type: [String], // Array of strings
    required: true
  },
  maxSongs: {
    type: Number,
    required: true
  },
  revenueShare: {
    type: Number, // Percentage for artists
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Plan', PlanSchema);
