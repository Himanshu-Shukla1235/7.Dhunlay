const mongoose = require("mongoose");

const PlanSchema = new mongoose.Schema(
  {
    name: {
      type: String,

      required: true,
      unique: true, // ensures name is unique
    },
    planType: {
      type: String,

      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    duration: {
      type: Number, // In months
      required: true,
    },
    features: {
      type: [String], // Array of strings
      required: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Plan", PlanSchema);
