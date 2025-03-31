import React, { useState } from "react";
import "./getUser.css"
const GetSpotifyArtists = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [artists, setArtists] = useState([]);
  const [error, setError] = useState(null);

  const fetchArtists = async () => {
    setIsLoading(true);
    setError(null);

    const url = "https://spotifystefan-skliarovv1.p.rapidapi.com/getArtists";
    const options = {
      method: "POST",
      headers: {
        "x-rapidapi-key": "af4cf82413msh38a2eb919d3407bp12ca4fjsnf91e4364d8d2", // Replace with your API key
        "x-rapidapi-host": "Spotifystefan-skliarovV1.p.rapidapi.com",
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({}),
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      setArtists(data || []); // Ensure it handles empty responses
    } catch (err) {
      setError("Failed to fetch artists.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="spotify-container">
      <h1>Spotify Artists</h1>
      <button className="fetch-button" onClick={fetchArtists} disabled={isLoading}>
        {isLoading ? "Loading..." : "Get Artists"}
      </button>

      {error && <p className="error">{error}</p>}

      <div className="artist-list">
        {artists.length > 0 ? (
          artists.map((artist, index) => (
            <div key={index} className="artist-card">
              <img src={artist.image} alt={artist.name} className="artist-image" />
              <h3>{artist.name}</h3>
              <p>Followers: {artist.followers}</p>
              <p>Popularity: {artist.popularity}</p>
            </div>
          ))
        ) : (
          !isLoading && <p>No artists found.</p>
        )}
      </div>
    </div>
  );
};

export default GetSpotifyArtists;
