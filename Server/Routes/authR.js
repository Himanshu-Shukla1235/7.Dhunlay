const express = require("express");
const router = express.Router();

// Importing the registerUser function from the auth controller
const { registerUser, loginUser,logoutUser } = require("../Controllers/auth");


const authenticateUser = require("../Middlewares/authenticationM");

// Defining the POST route for user registration
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/verify-email").post();
router.route("/logout").get(logoutUser);


// Exporting the router
module.exports = router;
