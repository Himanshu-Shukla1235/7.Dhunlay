const express = require("express");
const router = express.Router();

// Importing the registerUser function from the auth controller
const { registerUser, loginUser } = require("../Controllers/auth");


const authenticateUser = require("../Middlewares/authenticationM");

// Defining the POST route for user registration
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);


// Exporting the router
module.exports = router;
