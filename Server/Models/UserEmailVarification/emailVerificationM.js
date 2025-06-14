const mongoose = require("mongoose");

const EmailVeriSchema = new mongoose.Schema({
  email: String,
  password: String,
  isVerified: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("EmailVerificationInitiate", EmailVeriSchema);
