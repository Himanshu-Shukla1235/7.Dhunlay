const express = require("express");
const router = express.Router();

const {
  saveSong
   
} = require("../Controllers/MetaDataCon");
const authenticateUser = require("../Middlewares/authenticationM");
const { getReleasedSongsByArtist }=require("../Controllers/MetaDataCon")

// Protect routes using authenticateUser middleware
router.route("/meta").post( saveSong);
router.route("/releasedSongsData").get( getReleasedSongsByArtist );

// Exporting the router
module.exports = router;
