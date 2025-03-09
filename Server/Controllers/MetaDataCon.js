const { validationResult } = require("express-validator");
const Song = require("../Models/songsDataModle/MetaData");

const mongoose = require("mongoose");
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


// Save Song Metadata
const saveSong = async (req, res) => {
  try {
    console.log("🎵 Song metadata detected");

    // Convert userId to ObjectId if it exists
    if (req.body.submittedBy?.userId) {
      req.body.submittedBy.userId = new mongoose.Types.ObjectId(
        req.body.submittedBy.userId
      );
    }

    // Create and save new song
    const song = new Song(req.body);
    await song.save();

    res.status(201).json({
      success: true,
      message: "✅ Song metadata saved successfully",
      data: song,
    });
  } catch (error) {
    console.error("❌ Error saving song:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Simple Test Function
const test = async (req, res) => {
  try {
    console.log("✅ Metadata test passed");
    res.status(200).json({ message: "Metadata test passed" });
  } catch (err) {
    res.status(500).json({ error: "❌ Metadata test error" });
  }
};

module.exports = { saveSong, test };

