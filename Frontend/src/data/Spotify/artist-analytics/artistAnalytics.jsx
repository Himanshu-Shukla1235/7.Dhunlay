import React, { useState } from "react";
import axios from "axios";
import "./artistAnalytics.css";

const SpotifyArtistAnalytics = () => {
  const [artistName, setArtistName] = useState("");
  const [artistData, setArtistData] = useState(null);
  const [topTracks, setTopTracks] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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

  const fetchArtistAnalytics = async () => {
    setLoading(true);
    setError("");
    setArtistData(null);
    setTopTracks([]);

    try {
      const token = await getToken();

      const searchRes = await axios.get("https://api.spotify.com/v1/search", {
        headers: { Authorization: `Bearer ${token}` },
        params: { q: artistName, type: "artist", limit: 1 },
      });

      const artist = searchRes.data.artists.items[0];
      if (!artist) {
        throw new Error("Artist not found");
      }

      const artistId = artist.id;

      const artistDetails = await axios.get(
        `https://api.spotify.com/v1/artists/${artistId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const topTracksRes = await axios.get(
        `https://api.spotify.com/v1/artists/${artistId}/top-tracks`,
        {
          headers: { Authorization: `Bearer ${token}` },
          params: { market: "IN" },
        }
      );

      setArtistData({
        name: artistDetails.data.name,
        followers: artistDetails.data.followers.total,
        popularity: artistDetails.data.popularity,
        genres: artistDetails.data.genres,
        image: artistDetails.data.images[0]?.url,
        spotifyUrl: artistDetails.data.external_urls.spotify,
      });

      setTopTracks(topTracksRes.data.tracks);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch analytics.");
    }

    setLoading(false);
  };

  return (
    <div className="sa-container">
      <h2>🎧 Spotify Artist Analytics</h2>

      <input
        type="text"
        className="sa-input"
        placeholder="Enter artist name"
        value={artistName}
        onChange={(e) => setArtistName(e.target.value)}
      />
      <button className="sa-btn" onClick={fetchArtistAnalytics}>
        Get Analytics
      </button>

      {loading && <p>Loading...</p>}
      {error && <p className="sa-error">{error}</p>}

      {artistData && (
        <div className="sa-artist-card">
          <img src={artistData.image} alt={artistData.name} />
          <h3>{artistData.name}</h3>
          <p>Followers: {artistData.followers.toLocaleString()}</p>
          <p>Popularity: {artistData.popularity} / 100</p>
          <p>Genres: {artistData.genres.join(", ")}</p>
          <a href={artistData.spotifyUrl} target="_blank" rel="noreferrer">
            Open on Spotify
          </a>

          <h4>Top Tracks</h4>
          <ul className="sa-tracks">
            {topTracks.map((track) => (
              <li key={track.id}>
                <a href={track.external_urls.spotify} target="_blank" rel="noreferrer">
                  {track.name}
                </a>{" "}
                – Popularity: {track.popularity}/100
                {track.preview_url && (
                  <audio controls src={track.preview_url} style={{ display: "block", marginTop: 5 }} />
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SpotifyArtistAnalytics;
