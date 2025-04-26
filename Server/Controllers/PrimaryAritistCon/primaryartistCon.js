const PrimaryArtist = require("../../Models/UserDetailsModels/primaryArtist");

const upsertPrimaryArtist = async (req, res) => {
    console.log("Backend: adding Primary artist");
    const { userId, artistName } = req.body;
  
    try {
      let artist = await PrimaryArtist.findOne({
        userId,
        primaryArtistName: artistName,
      });
  
      if (artist) {
        return res.status(200).json({
          success: true,
          message: "Primary artist already exists",
          data: artist,
          alreadyExists: true,
        });
      }
  
      artist = await PrimaryArtist.create({
        userId,
        primaryArtistName: artistName,
        totalReleasedSongs: 1,
      });
  
      res.status(200).json({
        success: true,
        message: "Primary artist created successfully",
        data: artist,
        alreadyExists: false,
      });
    } catch (error) {
      console.error("❌ Error upserting primary artist:", error);
      res.status(500).json({
        success: false,
        message: "Failed to upsert primary artist",
        error,
      });
    }
  };
  
// -------------------------------GET all primary artists-------------------------
const getAllPrimaryArtists = async (req, res) => {
    console.log("from bckend: hits getAllprimaryArtist");
    const { userId } = req.query;
  
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "Missing userId in query parameters",
      });
    }
  
    try {
      const artists = await PrimaryArtist.find({ userId }).sort({
        totalReleasedSongs: -1,
      });
  
      res.status(200).json({
        success: true,
        data: artists,
      });
    } catch (error) {
      console.error("❌ Error getting artists:", error);
      res.status(500).json({
        success: false,
        message: "Server Error",
        error,
      });
    }
  };
  

// GET single primary artist by ID or Name
const getPrimaryArtist = async (req, res) => {
  const { id, name } = req.query;

  try {
    let artist;

    if (id) {
      artist = await PrimaryArtist.findById(id);
    } else if (name) {
      artist = await PrimaryArtist.findOne({ primaryArtistName: name });
    }

    if (!artist) {
      return res.status(404).json({
        success: false,
        message: "Primary artist not found",
      });
    }

    res.status(200).json({ success: true, data: artist });
  } catch (error) {
    console.error("❌ Error getting artist:", error);
    res.status(500).json({ success: false, message: "Server Error", error });
  }
};

//--------------------- UPDATE specific platform data----------------------------
const updatePlatformData = async (req, res) => {
  const { id } = req.params; // Primary artist ID
  const { platformName, platformValue } = req.body;

  // Validate platformName
  const validPlatforms = [
    "Spotify",
    "AppleMusic",
    "AmazonMusic",
    "YouTubeMusic",
  ];
  if (!validPlatforms.includes(platformName)) {
    return res.status(400).json({
      success: false,
      message: `Invalid platform name. Valid options: ${validPlatforms.join(
        ", "
      )}`,
    });
  }

  try {
    const update = {};
    update[`platformData.${platformName}`] = platformValue;

    const artist = await PrimaryArtist.findByIdAndUpdate(
      id,
      { $set: update },
      { new: true }
    );

    if (!artist) {
      return res
        .status(404)
        .json({ success: false, message: "Artist not found" });
    }

    res.status(200).json({
      success: true,
      message: `Platform data for ${platformName} updated successfully`,
      data: artist,
    });
  } catch (error) {
    console.error("❌ Error updating platform data:", error);
    res.status(500).json({ success: false, message: "Server Error", error });
  }
};

// DELETE artist
const deletePrimaryArtist = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await PrimaryArtist.findByIdAndDelete(id);

    if (!result) {
      return res
        .status(404)
        .json({ success: false, message: "Artist not found" });
    }

    res.status(200).json({ success: true, message: "Artist deleted" });
  } catch (error) {
    console.error("❌ Error deleting artist:", error);
    res.status(500).json({ success: false, message: "Server Error", error });
  }
};

module.exports = {
  upsertPrimaryArtist,
  getAllPrimaryArtists,
  getPrimaryArtist,
  updatePlatformData,
  deletePrimaryArtist,
};
