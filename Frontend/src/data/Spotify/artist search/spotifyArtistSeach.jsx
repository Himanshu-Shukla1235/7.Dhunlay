import React, { useState } from "react";
import axios from "axios";
import "./spotifyArtistSeach.css";

const SpotifyArtistSearch = () => {
  const [artistName, setArtistName] = useState("");
  const [artistData, setArtistData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getToken = async () => {
    const clientId = "d0d31c5dfba84f63a8f55a57bfe33640";
    const clientSecret = "936625e6cc6b42fdb04eb84472357e81";
    const encoded = btoa(`${clientId}:${clientSecret}`);

    const res = await axios.post(
      "https://accounts.spotify.com/api/token",
      "grant_type=client_credentials",
      {
        headers: {
          Authorization: `Basic ${encoded}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    return res.data.access_token;
  };

  const searchArtist = async () => {
    setLoading(true);
    setError("");
    setArtistData(null);

    try {
      const token = await getToken();

      const res = await axios.get("https://api.spotify.com/v1/search", {
        params: { q: artistName, type: "artist", limit: 1 },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const artist = res.data.artists.items[0];
      if (!artist) {
        setError("No artist found");
        setLoading(false);
        return;
      }

      setArtistData({
        name: artist.name,
        id: artist.id,
        image: artist.images?.[0]?.url,
        followers: artist.followers.total,
        genres: artist.genres.join(", "),
        spotifyUrl: artist.external_urls.spotify,
      });
    } catch (err) {
      setError("Something went wrong");
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <div className="spotifyArtistSeach-search-container">
      <h2 className="spotifyArtistSeach-title">🔍 Search Artist on Spotify</h2>

      <input
        className="spotifyArtistSeach-input-box"
        type="text"
        placeholder="Enter artist name"
        value={artistName}
        onChange={(e) => setArtistName(e.target.value)}
      />

      <button className="spotifyArtistSeach-search-button" onClick={searchArtist}>
        Search
      </button>

      {loading && <p className="spotifyArtistSeach-info-text">Loading...</p>}
      {error && <p className="spotifyArtistSeach-error-text">{error}</p>}

      {artistData && (
        <div className="spotifyArtistSeach-artist-card">
          <img
            src={artistData.image}
            alt={artistData.name}
            className="spotifyArtistSeach-artist-img"
          />
          <h3>{artistData.name}</h3>
          <p>
            <strong>Followers:</strong> {artistData.followers.toLocaleString()}
          </p>
          <p>
            <strong>Genres:</strong> {artistData.genres}
          </p>
          <a
            href={artistData.spotifyUrl}
            target="_blank"
            rel="noreferrer"
            className="spotifyArtistSeach-spotify-link"
          >
            🎧 Open in Spotify
          </a>
        </div>
      )}
    </div>
  );
};

export default SpotifyArtistSearch;
