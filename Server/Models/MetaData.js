const mongoose = require('mongoose');

const songSchema = new mongoose.Schema(
  {
    songTitle: { type: String, required: true, trim: true, index: true },
    primaryArtist: { type: String, required: true, trim: true },
    featuringArtists: { type: [String], default: [], trim: true },
    author: { type: String, required: true, trim: true },
    composer: { type: String, required: true, trim: true },
    musicProducer: { type: String, required: true, trim: true },
    musicDirector: { type: String, required: true, trim: true },
    lyrics: { type: String, required: true, trim: true },
    coverArt: { type: String, required: true, trim: true }, // URL or file path
    songFile: {
      format: { type: String, required: true, trim: true, enum: ['MP3', 'WAV', 'FLAC', 'AAC'] },
      fileUrl: { type: String, required: true, trim: true }
    },
    releaseDate: { type: Date, required: true },
    genres: { type: [String], required: true, validate: arr => arr.length > 0 }, // At least one genre
    language: { type: String, required: true, trim: true },
    explicitContent: { type: Boolean, default: false },
    distributionPlatforms: {
      type: [String],
      required: true,
      validate: arr => arr.length > 0 // At least one platform
    },
    metadata: {
      isrc: { type: String, required: true, unique: true, trim: true },
      upc: { type: String, required: true, unique: true, trim: true },
      bpm: { type: Number, required: true, min: 30, max: 300 }, // BPM range check
      key: { type: String, required: true, trim: true },
      mood: { type: String, required: true, trim: true }
    },
    submittedBy: {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false, index: true },
      email: { type: String, required: false, trim: true, lowercase: true }
    },
    status: {
      type: String,
      enum: ['Pending', 'Approved', 'Rejected'],
      default: 'Pending'
    }
  },
  { timestamps: true }
);



const Song = mongoose.model('Song', songSchema);

module.exports = Song;
