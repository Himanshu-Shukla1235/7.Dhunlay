const express = require("express");
const router = express.Router();

const { saveSong, test } = require("../Controllers/MetaDataCon");
const authenticateUser = require("../Middlewares/authenticationM");

// Protect routes using authenticateUser middleware
router.route("/meta").post(authenticateUser, saveSong);
router.route("/metatest").post(authenticateUser, test);

// Exporting the router
module.exports = router;
