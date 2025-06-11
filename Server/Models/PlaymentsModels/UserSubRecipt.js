const mongoose = require("mongoose");

const UserSubscriptionReceiptSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    for: {
      type: String,
      enum: ["artist", "label"], // Removed empty string
      required: true,
    },
    type: {
      type: String,
      enum: ["Freemium", "Single Release", "EP/Album"],
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["completed", "failed", "pending"],
      required: true,
    },
    validTill: {
      type: Date,
      required: true,
    },
    // Optional: Payment method field, uncomment if needed
    // method: {
    //   type: String,
    //   enum: ["credit_card", "paypal", "bank_transfer", "upi"],
    //   required: true,
    // },
  },
  { timestamps: true }
);

// Export with consistent name
module.exports = mongoose.model("UserSubscriptionReceipt", UserSubscriptionReceiptSchema);
