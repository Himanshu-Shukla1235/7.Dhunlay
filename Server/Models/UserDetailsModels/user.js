const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      trim: true,
      maxlength: [20, "Username cannot exceed 20 characters"],
      minlength: [3, "Username must be at least 3 characters"],
    },
    password: {
      type: String,
      minlength: [6, "Password must be at least 6 characters long"],
      // Optional if using Google login
    },
    googleId: {
      type: String,
      unique: true,
      sparse: true, // Allows multiple null values
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      validate: {
        validator: function (value) {
          return emailRegex.test(value);
        },
        message: (props) => `${props.value} is not a valid email address!`,
      },
    },
    location: {
      type: String,
      trim: true,
      default: "Not specified",
    },
    country: {
      type: String,
      trim: true,
      default: "Not specified",
    },
    state: {
      type: String,
      trim: true,
      default: "Not specified",
    },
  },
  {
    timestamps: true,
  }
);

// Hash password if present and modified
UserSchema.pre("save", async function (next) {
  if (this.password && this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

// Password compare method (used only for non-Google users)
UserSchema.methods.comparePassword = async function (candidatePassword) {
  if (!this.password) return false;
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model("User", UserSchema);
