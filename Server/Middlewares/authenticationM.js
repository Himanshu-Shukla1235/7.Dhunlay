const jwt = require("jsonwebtoken");
const User = require("../Models/user"); // Adjust the path to your User model

const authenticateUser = async (req, res, next) => {
  console.log("🔍 Authentication middleware triggered...");

  try {
    // 1. Extract token from cookies or authorization headers
    let token = req.cookies?.token;

    if (!token) {
      const authHeader = req.headers.authorization;
      if (authHeader && authHeader.startsWith("Bearer ")) {
        token = authHeader.split(" ")[1]; // Extract token from Bearer scheme
      }
    }

    if (!token) {
      console.log("❌ No token provided.");
      return res.status(401).json({
        success: false,
        message: "Authentication failed. No token provided.",
      });
    }

    // 2. Verify the token
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      console.log("❌ Token verification failed:", error.message);
      return res.status(401).json({
        success: false,
        message: "Invalid or expired token.",
      });
    }

    // 3. Fetch user from database
    const user = await User.findById(decoded.userId).select("-password"); // Exclude password from response

    if (!user) {
      console.log(`❌ User not found for token ID: ${decoded.userId}`);
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    // 4. Attach user data to request object
    req.user = user;
    console.log(`✅ User authenticated: ${user._id}`);

    next(); // Proceed to next middleware or route handler
  } catch (error) {
    console.error("❌ Unexpected error in authentication middleware:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error. Please try again later.",
    });
  }
};

module.exports = authenticateUser;
