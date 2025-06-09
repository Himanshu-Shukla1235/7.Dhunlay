const mongoose = require('mongoose');

const PlanSchema = new mongoose.Schema({
  name: {
    type: String,
    enum: ['Free', 'A-plan-1', 'A-plan-2','L-plan-1'],
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  duration: {
    type: Number, // In months
    required: false  },
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
    required: false
  }
}, { timestamps: true });

module.exports = mongoose.model('Plan', PlanSchema);
