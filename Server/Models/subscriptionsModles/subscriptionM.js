const mongoose = require("mongoose");

const SubscriptionSchema = new mongoose.Schema(
  {
    name: {
      type: String,

      required: true,
      unique: true, // ensures name is unique
    },
    status: {
      type: String,

      required: false,
      // ensures name is unique
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    planId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Plan",
      required: false,
    },

    startDate: {
      type: Date,
      required: false,
    },

    orderId: {
      type: String,
      ref: "Payment",
    },
    expiresAt: {
      type: Date,
      default: () => new Date(Date.now() + 31536000000), // 1 year TTL
    },
  },
  { timestamps: true }
);

SubscriptionSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

module.exports = mongoose.model("Subscription", SubscriptionSchema);
