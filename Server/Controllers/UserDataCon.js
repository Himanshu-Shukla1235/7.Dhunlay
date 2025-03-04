const User = require("../Models/user"); // Import User model

// Get user data by ID
const getUserById = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId); // Fetch user from DB

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get current logged-in user (for authentication)
const getCurrentUser = async (req, res) => {
    console.log("🧑‍💻get current user detected");
  try {
    const userId = req.user.id; // Assuming authentication middleware adds `req.user`
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching current user:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getUserById, getCurrentUser };
