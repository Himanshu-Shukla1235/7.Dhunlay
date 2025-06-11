const mongoose = require("mongoose");
const { ref } = require("yup");

const SubscriptionPaymentsSchema = new mongoose.Schema({
  userId: {
    ref: "User",
    required: true,
  },
  
});
