const express = require("express");
const router = express.Router();

const {
  upsertPrimaryArtist,getAllPrimaryArtists
} = require("../Controllers/PrimaryAritistCon/primaryartistCon");

router.route("/addPrimaryArtist").post(upsertPrimaryArtist);
router.route("/getAllPrimaryArtists").get(getAllPrimaryArtists);
module.exports = router;
