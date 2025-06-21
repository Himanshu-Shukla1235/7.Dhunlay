import React, { useState } from "react";
import axios from "axios";
import "./OdesliAllAongLinks.css";

const MusicSmartLinks = () => {
  const [musicUrl, setMusicUrl] = useState("");
  const [songData, setSongData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchSongLinks = async () => {
    if (!musicUrl) return;
    setLoading(true);
    setError("");
    setSongData(null);

    try {
      const response = await axios.get(
        "https://api.song.link/v1-alpha.1/links",
        {
          params: { url: musicUrl },
        }
      );

      const data = response.data;
      const mainEntityId = data.entityUniqueId;
      const songInfo = data.entitiesByUniqueId[mainEntityId];
      console.log(data);
      setSongData({
        title: songInfo.title,
        artist: songInfo.artistName,
        thumbnail: songInfo.thumbnailUrl,
        pageUrl: data.pageUrl,
        links: data.linksByPlatform,
      });
    } catch (err) {
      setError("Could not fetch song links. Please check the URL.");
      console.error(err);
    }

    setLoading(false);
  };

  //save to backend
  const saveToBackend = async (songData) => {
    try {
      const mappedLinks = {
        spotify: songData.links.spotify,
        appleMusic: songData.links.applemusic,
        youtubeMusic: songData.links.youtubemusic,
        amazonMusic: songData.links.amazonmusic,
        Anghami: songData.links.anghami,
        deezer: songData.links.deezer,
        tidal: songData.links.tidal,
        soundcloud: songData.links.soundcloud,
        iTune: songData.links.itunes,
      };

      const payload = {
        songTitle: songData.title,
        artistName: songData.artist,
        thumbnail: songData.thumbnail,
        smartLink: songData.pageUrl,
        linksByPlatform: mappedLinks,
        createdBy: "USER_OBJECT_ID", // optional: replace or add this if using auth
      };

      await axios.post("http://localhost:5000/api/fanlink", payload); // Update URL if needed
      console.log("✅ Saved to backend");
    } catch (err) {
      console.error("❌ Failed to save song data to backend", err);
    }
  };
  //-----------------------------------------------------------
  return (
    <div className="OdesliAllAongLinks-smart-links-container">
      <h2 className="OdesliAllAongLinks-title">
        🎧 Generate Smart Music Links
      </h2>

      <input
        type="text"
        className="OdesliAllAongLinks-input-box"
        placeholder="Paste Spotify or Apple Music track URL"
        value={musicUrl}
        onChange={(e) => setMusicUrl(e.target.value)}
      />

      <button
        className="OdesliAllAongLinks-search-button"
        onClick={fetchSongLinks}
      >
        Generate Links
      </button>

      {loading && <p className="OdesliAllAongLinks-info-text">Loading...</p>}
      {error && <p className="OdesliAllAongLinks-error-text">{error}</p>}

      {songData && (
        <div className="OdesliAllAongLinks-song-info-card">
          <img
            src={songData.thumbnail}
            alt="thumbnail"
            className="OdesliAllAongLinks-song-thumbnail"
          />
          <h3>{songData.title}</h3>
          <p>by {songData.artist}</p>

          <div className="OdesliAllAongLinks-platform-links">
            {Object.entries(songData.links).map(([platform, info]) => (
              <a
                key={platform}
                href={info.url}
                target="_blank"
                rel="noreferrer"
                className="OdesliAllAongLinks-platform-link"
              >
                {platform.charAt(0).toUpperCase() + platform.slice(1)}
              </a>
            ))}
          </div>

          <a
            className="OdesliAllAongLinks-smart-link"
            href={songData.pageUrl}
            target="_blank"
            rel="noreferrer"
          >
            🌐 Universal Smart Link
          </a>
        </div>
      )}
    </div>
  );
};

export default MusicSmartLinks;
