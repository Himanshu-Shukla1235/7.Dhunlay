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
  console.log("new song upload triggred");
  try {
    const {
      songName, // Corrected from songTitle
      primaryArtists, // Corrected from primaryArtist
      featuringArtists,
      authors, // Corrected from author
      composers, // Corrected from composer
      musicProducers, // Corrected from musicProducer
      musicDirectors, // Corrected from musicDirector
      C_line,
      p_line, // Corrected from P_line
      labelName,
      lyrics,
      lyricsFile,
      language,
      genere, // Corrected from genres
      //----------------------------step2
      songFile,
      coverArt,
      //----------------------------step3
      releaseDate,
      userId,
      isrc,
      upc,
      explicitContent,
      distributionPlatform, // Corrected from distributionPlatforms
    } = req.body;

    // Convert explicitContent to boolean
    const explicitContentBool = explicitContent === "yes" ? true : false;

    // Creating metadata object properly
    const metadata = {
      isrc,
      upc,
    };
    const Songfile = {
      fileUrl: songFile,
    };
    const submittedBy = {
     userId:userId,
    };

    // Create a new song instance
    const newSong = await Song.create({
      songTitle: songName,
      primaryArtist: primaryArtists,
      featuringArtists,
      author: authors,
      composer: composers,
      musicProducer: musicProducers,
      musicDirector: musicDirectors,
      lyrics,
      lyricsFile,
      C_line,
      P_line: p_line, // Mapping correctly
      labelName,
      genres: genere, // Mapping correctly
      language,
      coverArt,
      songFile: Songfile,
      explicitContent: explicitContentBool, // Convert properly
      distributionPlatforms: distributionPlatform, // Mapping correctly
      metadata:metadata, // Assigning the metadata object
      releaseDate,
      submittedBy:submittedBy,
    });

    res.status(201).json({
      success: true,
      message: "Song uploaded successfully",
      data: newSong,
    });
  } catch (error) {
    console.error("Error uploading song:", error);
    res
      .status(500)
      .json({ success: false, message: "Internal Server Error", error });
  }
};

// -----------------------------Get total number of released songs---------------
const getReleasedSongsByArtist = async (req, res) => {
  console.log("✅ Backend hit: getReleasedSongsByArtist");

  try {
    let { artistNames } = req.query;

    // If not present
    if (!artistNames) {
      return res.status(400).json({
        success: false,
        message: "Query param `artistNames` is required",
      });
    }

    // If it's a single artist (not array), convert to array
    if (typeof artistNames === "string") {
      artistNames = [artistNames];
    }

    // Find songs with releaseDate set and where ANY of the artistNames exist in the primaryArtist array
    const releasedSongs = await Song.find({
      releaseDate: { $ne: null },
      primaryArtist: { $in: artistNames },
    });

    res.status(200).json({
      success: true,
      message: `Fetched released songs for: ${artistNames.join(", ")}`,
      total: releasedSongs.length,
      data: releasedSongs,
    });
  } catch (error) {
    console.error("❌ Error fetching released songs:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch released songs",
    });
  }
};

const getAllSongs = async (req, res) => {
  console.log("✅ Backend hit: getAllSongs");

  try {
    const songs = await Song.find(); // Fetch everything

    res.status(200).json({
      success: true,
      message: `Fetched all songs`,
      total: songs.length,
      data: songs,
    });
  } catch (error) {
    console.error("❌ Error fetching all songs:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch all songs",
    });
  }
};

const getAllSongsByUser = async (req, res) => {
  console.log("✅ Backend hit: getAllSongsByUser");

  try {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "`userId` query parameter is required",
      });
    }

    const songs = await Song.find({ createdBy: userId }); // Assuming "createdBy" stores userId

    res.status(200).json({
      success: true,
      message: `Fetched all songs for user: ${userId}`,
      total: songs.length,
      data: songs,
    });
  } catch (error) {
    console.error("❌ Error fetching songs by user:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch songs by user",
    });
  }
};


module.exports = { saveSong, getReleasedSongsByArtist ,getAllSongs,getAllSongsByUser};
