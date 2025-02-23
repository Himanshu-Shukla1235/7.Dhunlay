const { validationResult } = require("express-validator");
const Song = require("../Models/MetaData");


/**
 * @desc    Save song metadata for distribution
 * @route   POST /api/songs
 * @access  Public
 * @param   {Object} req - Express request object containing song metadata
 * @param   {Object} res - Express response object used to send the result
 * @returns {void}
 * @example
 * Request body:
 * {
 *   "songTitle": "My Song",
 *   "primaryArtist": "John Doe",
 *   "featuringArtists": ["Jane Doe"],
 *   "author": "John Doe",
 *   "composer": "John Doe",
 *   "musicProducer": "Producer Name",
 *   "musicDirector": "Director Name",
 *   "lyrics": "Lyrics of the song...",
 *   "coverArt": "https://example.com/image.jpg",
 *   "songFile": {
 *     "format": "MP3",
 *     "fileUrl": "https://example.com/song.mp3"
 *   },
 *   "releaseDate": "2025-02-19T00:00:00.000Z",
 *   "genres": ["Pop", "Rock"],
 *   "language": "English",
 *   "explicitContent": false,
 *   "distributionPlatforms": ["Spotify", "Apple Music"],
 *   "metadata": {
 *     "isrc": "US-XYZ-123456",
 *     "upc": "0123456789012",
 *     "bpm": 120,
 *     "key": "C Major",
 *     "mood": "Happy"
 *   },
 *   "submittedBy": {
 *     "userId": "65d1a8e1234567890abcd123",
 *     "email": "user@example.com"
 *   }
 * }
 *
 * Successful Response:
 * {
 *   "success": true,
 *   "message": "Song metadata saved successfully",
 *   "data": { ...saved song data }
 * }
 *
 * Error Response:
 * {
 *   "success": false,
 *   "message": "Error message describing the issue"
 * }
 */
const saveSong = async (req, res) => {
  // Validate request data
  //   const errors = validationResult(req);
  //   if (!errors.isEmpty()) {
  //     return res.status(400).json({ success: false, errors: errors.array() });
  //   }

  try {
    console.log("song metadata detected");
    // Create a new song metadata entry
    const song = new Song(req.body);
    await song.save();

    res.status(201).json({
      success: true,
      message: "Song metadata saved successfully",
      data: song,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
const test = async (req, res) => {
  try {
    console.log("metadat test passed ");
    re.status(101).json("metadat test passed");
  } catch (err) {
    res.status(1011).json("metadata test err 101");
  }
};
module.exports = { saveSong, test };
