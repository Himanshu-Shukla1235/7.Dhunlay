const User = require("../Models/user"); // Adjust path as necessary
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
const sendEmail = async (to, subject, message) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail", // Or use an SMTP provider like SendGrid, Mailgun
      auth: {
        user: process.env.EMAIL_USER, // Your email
        pass: process.env.EMAIL_PASS, // App password (not your email password)
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      html: `<p>${message}</p>`,
    };

    await transporter.sendMail(mailOptions);
    console.log("📧 Registration email sent successfully!");
  } catch (error) {
    console.error("❌ Error sending email:", error);
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
  console.log("regestring new user detected");
  try {
    const { username, password, email, country, state, location } = req.body;

    if (!username || !password || !email || !country || !state) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be provided.",
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Email already in use. Please use a different email.",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      location,
      country,
      state,
    });

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
    // Send Welcome Email
    await sendEmail(
      email,
      "Welcome to Dhunlay – Let's Amplify Your Music! 🎵",
      `<h3>Hey ${username},</h3>

   <br>
   <img src="https://pixabay.com/images/search/music%20wallpaper/" alt="Dhunlay Banner" width="100%" style="max-width:600px; margin-top:10px;"/>
   <p>Welcome to <b>Dhunlay</b> – your ultimate music distribution partner! 🚀</p>
   <p>We empower independent artists like you to distribute your music seamlessly across top streaming platforms worldwide. Whether it's Spotify, Apple Music, or YouTube Music – we’ve got you covered!</p>
   <p>🌟 <b>What’s next?</b> Upload your tracks, reach millions of listeners, and start earning from your passion!</p>
   <p>If you need any support, we’re just a message away. Let’s make your music heard!</p>
   <p>🎶 <b>Let’s create something extraordinary together!</b></p>
   <p><b>Team Dhunlay</b></p>`
    );

    const { password: _, ...userData } = user.toObject();

    return res.status(201).json({
      success: true,
      message: "User registered successfully 🎉",
      user: userData,
      token,
    });
  } catch (error) {
    console.error("Error in registerUser:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
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

    const user = await User.findOne({ email });
    console.log(user);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not registered.",
      });
    }
    console.log("password", user.password);
    // Check password
    const isPasswordCorrect = await user.comparePassword(password);
    console.log(isPasswordCorrect); // Debugging password comparison result

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

module.exports = { registerUser, loginUser, logoutUser };
