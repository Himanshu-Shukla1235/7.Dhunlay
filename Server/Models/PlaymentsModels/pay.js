const mongoose = require('mongoose');

const PaySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  recipientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Could be a user or company (if applicable)
    required: false
  },
  type: {
    type: String,
    enum: ['subscription', 'royalty', 'payout', 'refund'],
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  currency: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['completed', 'failed', 'pending'],
    required: true
  },
  method: {
    type: String,
    enum: ['credit_card', 'paypal', 'bank_transfer', 'upi'],
    required: true
  },
  transactionId: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: false
  }
}, { timestamps: true });

module.exports = mongoose.model('Pay', PaySchema);
