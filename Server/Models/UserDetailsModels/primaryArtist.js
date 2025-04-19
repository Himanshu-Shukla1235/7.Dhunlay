const mongoose = require("mongoose");

const primaryArtistSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    primaryArtistName: {
      type: String,
      required: true,
      trim: true,
    },
    totalReleasedSongs: {
      type: Number,
      default: 0,
    },
    platformData: {
      Spotify: {
        type: String,
        trim: true,
      },
      AppleMusic: {
        type: String,
        trim: true,
      },
      AmazonMusic: {
        type: String,
        trim: true,
      },
      YouTubeMusic: {
        type: String,
        trim: true,
      },
    },
  },
  { timestamps: true }
);

const PrimaryArtist = mongoose.model("PrimaryArtist", primaryArtistSchema);

module.exports = PrimaryArtist;
