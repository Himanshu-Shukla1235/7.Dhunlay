const express = require("express");
const router = express.Router();

const {
  saveSong,
  getReleasedSongsByArtist,
  getAllSongs,getAllSongsByUser  // ⬅️ Import it here
} = require("../Controllers/MetaDataCon");

const authenticateUser = require("../Middlewares/authenticationM");

// Routes
router.route("/meta").post(saveSong);
router.route("/releasedSongsData").get(getReleasedSongsByArtist);
// router.route("/getAllSongs").get(getAllSongs); // ⬅️ Add this new route here
router.route("/getAllSongsByUser").get(getAllSongsByUser); // ⬅️ Add this new route here

// Exporting the router
module.exports = router;
