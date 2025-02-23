const express = require("express");
const router = express.Router();
const { getCurrentUser } = require("../Controllers/UserDataCon"); // Import controller
const authenticateUser = require("../Middlewares/authenticationM"); // Import authentication middleware

// Route to get the current logged-in user
router.get("/me", getCurrentUser);

module.exports = router;
