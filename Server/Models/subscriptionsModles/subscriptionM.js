const mongoose = require('mongoose');

const SubscriptionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  planId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Plan',
    required: true
  },

  startDate: {
    type: Date,
    required: true
  },
  
 
  paymentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Payment'
  },
  expiresAt: {
    type: Date,
    default: () => new Date(Date.now() + 31536000000) // 1 year TTL
  }
}, { timestamps: true });

SubscriptionSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

module.exports = mongoose.model('Subscription', SubscriptionSchema);
