const User = require("../Models/UserDetailsModels/user"); // Adjust path as necessary
const UserMailVeri = require("../Models/UserEmailVarification/emailVerificationM"); // Adjust path as necessary
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken"); // Ensure JWT is required at the top of your file
const nodemailer = require("nodemailer");

//=================================================================================

// User Model Structure (Ensure this matches your actual model)
//=================================================================================
/**
 * const mongoose = require("mongoose");
 * const UserSchema = new mongoose.Schema({
 *   username: { type: String, required: true },
 *   email: { type: String, required: true, unique: true },
 *   password: { type: String, required: true },
 *   location: { type: String },
 *   country: { type: String },
 *   state: { type: String },
 * });
 * UserSchema.pre("save", async function (next) {
 *   if (!this.isModified("password")) return next();
 *   const salt = await bcrypt.genSalt(10);
 *   this.password = await bcrypt.hash(this.password, salt);
 *   next();
 * });
 * UserSchema.methods.comparePassword = async function (enteredPassword) {
 *   return await bcrypt.compare(enteredPassword, this.password);
 * };
 * module.exports = mongoose.model("User", UserSchema);
 */
//=================================================================================

// ============================================================================================Function to send an email
//send welcome email

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS, // Must be an App Password, not real password
  },
});

// Verify connection configuration (on server startup)
transporter.verify(function (error, success) {
  if (error) {
    console.error("❌ Email transporter error:", error.message);
  } else {
    console.log("📬 Email transporter is ready");
  }
});

const sendEmail = async (to, subject, htmlMessage) => {
  try {
    const mailOptions = {
      from: `"DhunLay" <${process.env.GMAIL_USER}>`,
      to,
      subject,
      text: htmlMessage.replace(/<[^>]+>/g, ""), // Fallback plain text
      html: htmlMessage,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Email sent:", info.messageId);
    return true;
  } catch (error) {
    console.error("❌ Failed to send email:", error.message);
    return false;
  }
};

// Register User
//=================================================================================
/**
 * @desc    Register a new user
 * @route   POST /api/auth/register
 * @access  Public
 * @param   {Object} req - Express request object containing user data (username, password, email, etc.)
 * @param   {Object} res - Express response object used to send the result
 * @returns {void}
 * @example
 * Request body:
 * {
 *   "username": "john_doe",
 *   "password": "StrongPassword123",
 *   "email": "john.doe@example.com",
 *   "country": "United States",
 *   "state": "California",
 *   "location": "Los Angeles"
 * }
 *
 * Successful Response:
 * {
 *   "success": true,
 *   "message": "User registered successfully",
 *   "token": "<JWT_TOKEN>"
 * }
 *
 * Error Response:
 * {
 *   "success": false,
 *   "message": "Error message describing the issue"
 * }
 */


const registerUser = async (req, res) => {
  console.log("📥 Registering new user");

  try {
    const { username, password, email, country, state, location } = req.body;

    // Validation
    if (!username || !password || !email || !country || !state) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be provided.",
      });
    }

    // Check for existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Email already in use. Please use a different email.",
      });
    }

    // Cleanup and save to temporary verification DB
    await UserMailVeri.deleteOne({ email });
    await UserMailVeri.findOneAndUpdate(
      { email },
      { email, password },
      { upsert: true, new: true }
    );

    // Generate JWT token
    const payload = { username, email, location, country, state };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    // Verification link
    const verificationLink = `https://dhunlay.com/api/verify-email?token=${token}`;

    const htmlMessage = `
      <h3>Hey ${username},</h3>
      <p>Welcome to <b>Dhunlay</b> – your trusted music distribution partner! 🎶</p>
      <p>Please verify your email address to activate your account and unlock full access to our platform.</p>
      <p>👉 <a href="${verificationLink}"><b>Click here to verify your email</b></a></p>
      <p>If you didn’t sign up for Dhunlay, please ignore this message.</p>
      <p><b>– Team Dhunlay</b></p>
    `;

    // Send verification email
    const emailSent = await sendEmail(
      email,
      "Dhunlay - Please Verify Your Email",
      htmlMessage
    );

    if (!emailSent) {
      return res.status(500).json({
        success: false,
        message: "Failed to send verification email",
      });
    }

    return res.status(201).json({
      success: true,
      message: "Verification email sent successfully",
    });
  } catch (error) {
    console.error("❌ Error in registerUser:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Email verification to regester
const verifyEmail = async (req, res) => {
  console.log("verifyEmail hit");
  try {
    const { token } = req.query;
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // verify & decode token

    const emailFind = await UserMailVeri.findOne({ email: decoded.email }).sort(
      { createdAt: -1 }
    ); // descending order, so latest comes first

    if (!emailFind) {
      return res.redirect("https://dhunlay.com/?error=Email ");
    }

    // Create user using the decoded + temp stored password
    const user = await User.create({
      username: decoded.username,
      email: decoded.email, // ❗ Fix this line (was jwt.decoded.email which is wrong)
      password: emailFind.password,
      location: decoded.location,
      country: decoded.country,
      state: decoded.state,
    });

    // Create auth token
    const authToken = jwt.sign(
      { userId: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_LIFETIME }
    );

    // Set cookie
    res.cookie("token", authToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 3600000, // 1 hour
    });

    // Send Welcome Email
    await sendEmail(
      decoded.email,
      "Welcome to Dhunlay – Let's Amplify Your Music! 🎵",
      `<h3>Hey ${decoded.username},</h3>
      <p>Welcome to <b>Dhunlay</b> – your trusted music distribution partner! 🎶</p>
      <p>You're now verified and ready to upload tracks and go global!</p>
      <p>🎵 Let’s make your music heard around the world!</p>
      <p><b>– Team Dhunlay</b></p>
      <img src="https://c0.wallpaperflare.com/path/171/92/918/man-standing-beside-black-dynamic-microphone-ee2e13ae57d8cc569246fb6e50236e17.jpg" alt="Dhunlay Banner" width="100%" style="max-width:600px; margin-top:20px;"/>`
    );

    // Optional: Remove temporary verification entry
    await UserMailVeri.deleteOne({ email: decoded.email });
    console.log("user regestered succesfully");
    // Redirect after success
    return res.redirect("https://dhunlay.com/dashboard");
  } catch (err) {
    console.error("❌ Email verification error:", err.message);
    return res.redirect(
      "https://dhunlay.com/?error=Verification link expired or invalid"
    );
  }
};

// Forget Password

const ForgetPasswordHit = async (req, res) => {
  const { email } = req.body;
  console.log("backendHit: forget Password | email:", email);

  try {
    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({
        success: false,
        message: "Email not found.",
      });
    }

    // Create JWT token
    const payload = { email };
    const E_V_token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    // Reset password link
    const ForgotPasswordPageLink = `https://dhunlay.com/forgotPassword?token=${E_V_token}`;

    // Extract name or default to "there"
    const username = existingUser.username || "there";

    // Send email
    await sendEmail(
      email,
      "Dhunlay - Password Reset Request",
      `<h3>Hey ${username},</h3>
      <p>We received a request to reset your <b>Dhunlay</b> account password. 🔐</p>
      <p>If you made this request, please click the link below to reset your password:</p>
      <p>👉 <a href="${ForgotPasswordPageLink}"><b>Click here to reset your password</b></a></p>
      <p>This link will expire after a limited time for security reasons.</p>
      <p>If you didn’t request a password reset, you can safely ignore this message.</p>
      <p><b>– Team Dhunlay</b></p>`
    );

    return res.status(200).json({
      success: true,
      message: "Password reset email sent successfully.",
    });
  } catch (error) {
    console.error("Error in ForgetPasswordHit:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while processing the request.",
    });
  }
};

//Reset Password
const ResetPassword = async (req, res) => {
  console.log("backend: hiting the reset password ");
  const { token } = req.params;
  const { newPassword } = req.body;

  if (!token || !newPassword) {
    return res
      .status(400)
      .json({ message: "Token and new password are required." });
  }

  try {
    // ✅ Verify token and extract email
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const email = decoded.email;

    // ✅ Find the user by email
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found." });

    // ✅ Hash the new password

    // ✅ Save new password
    user.password = newPassword;
    await user.save();
    console.log("Incoming email:", email);
    console.log("Token from URL:", token);
    console.log("New password:", newPassword);

    return res.json({ message: "Password has been reset successfully." });
  } catch (err) {
    console.error("Reset password error:", err);
    return res.status(400).json({ message: "Invalid or expired token." });
  }
};
//=================================================================================
// Login User
//=================================================================================
/**
 * @desc    Login user
 * @route   POST /api/auth/login
 * @access  Public
 * @param   {Object} req - Express request object containing login credentials (email, password)
 * @param   {Object} res - Express response object used to send the result
 * @returns {void}
 * @example
 * Request body:
 * {
 *   "email": "john.doe@example.com",
 *   "password": "StrongPassword123"
 * }
 *
 * Successful Response:
 * {
 *   "success": true,
 *   "message": "Login successful",
 *   "token": "<JWT_TOKEN>"
 * }
 *
 * Error Response:
 * {
 *   "success": false,
 *   "message": "Invalid credentials"
 * }
 */
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Login attempt detected...");

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide both email and password.",
      });
    }

    // Ensure password is selected from the DB
    const user = await User.findOne({ email }).select("+password");
    console.log("User from DB:", user);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not registered.",
      });
    }

    // // Directly compare for debugging purposes
    // const isPasswordCorrect = await bcrypt.compare(password, user.password);
    // console.log("Direct bcrypt.compare result:", isPasswordCorrect);

    // Alternatively, if you trust your comparePassword method:
    const isPasswordCorrect = await user.comparePassword(password);
    console.log("comparePassword method result:", isPasswordCorrect);

    if (!isPasswordCorrect) {
      return res.status(401).json({
        success: false,
        message: "Incorrect password.",
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_LIFETIME }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 3600000, // 1 hour expiration
    });

    return res.status(200).json({
      success: true,
      message: "Login successful ✅",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        location: user.location,
        country: user.country,
        state: user.state,
      },
      token,
    });
  } catch (error) {
    console.error("Error in loginUser:", error.message);
    return res.status(500).json({
      success: false,
      message: "Server error during login.",
    });
  }
};
//__________________________________________________________________________________

/**
 * @desc    Logout user
 * @route   POST /api/auth/logout
 * @access  Private
 */
const logoutUser = async (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({
      success: true,
      message: "Logout successful.",
    });
  } catch (error) {
    console.error("Error in logoutUser:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  verifyEmail,
  ForgetPasswordHit,
  ResetPassword,
};
