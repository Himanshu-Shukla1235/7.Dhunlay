const express = require("express");
const router = express.Router();

const { saveSong, test } = require("../Controllers/MetaDataCon");
const authenticateUser = require("../Middlewares/authenticationM");

// Protect routes using authenticateUser middleware
router.route("/meta").post( saveSong);
router.route("/metatest").post( test);

// Exporting the router
module.exports = router;
