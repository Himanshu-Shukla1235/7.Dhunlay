const mongoose = require("mongoose");

const FanLinkSchema = new mongoose.Schema(
  {
    artistName: {
      type: String,
      required: true,
    },
    songTitle: {
      type: String,
      required: true,
    },
    releaseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Release",
      required: false, // optional if you want to link it
    },
    thumbnail: {
      type: String,
      required: false,
    },
    smartLink: {
      type: String, // Odesli (song.link) universal link
      required: true,
    },
    linksByPlatform: {
      spotify: {
        url: String,
        nativeAppUriMobile: String,
      },
      appleMusic: {
        url: String,
      },

      youtubeMusic: {
        url: String,
      },
      amazonMusic: {
        url: String,
      },
      Anghami: {
        url: String,
      },
      deezer: {
        url: String,
      },
      tidal: {
        url: String,
      },
      soundcloud: {
        url: String,
      },
      iTune: {
        url: String,
      },
      // Add more platforms as needed
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("FanLink", FanLinkSchema);
