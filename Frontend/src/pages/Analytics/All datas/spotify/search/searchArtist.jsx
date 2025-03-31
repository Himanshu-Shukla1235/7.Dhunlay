import React, { useState, useEffect } from "react";
import "./searchArtist.css";

const CLIENT_ID = "YOUR_CLIENT_ID"; // Replace with actual Client ID
const CLIENT_SECRET = "YOUR_CLIENT_SECRET"; // Replace with actual Client Secret
const TOKEN_URL = "https://accounts.spotify.com/api/token";

const SpotifySearch = () => {
  const [query, setQuery] = useState("");
  const [type, setType] = useState("album");
  const [limit, setLimit] = useState(10);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [rawJson, setRawJson] = useState(null);
  const [accessToken, setAccessToken] = useState(null);

  // Fetch Spotify Access Token on Component Mount
  useEffect(() => {
    fetchAccessToken();
  }, []);

  const fetchAccessToken = async () => {
    const authString = btoa(`d0d31c5dfba84f63a8f55a57bfe33640:936625e6cc6b42fdb04eb84472357e81`);
    try {
      const response = await fetch(TOKEN_URL, {
        method: "POST",
        headers: {
          Authorization: `Basic ${authString}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: "grant_type=client_credentials",
      });

      if (!response.ok) throw new Error("Failed to fetch access token");

      const data = await response.json();
      setAccessToken(data.access_token);
      console.log("Access Token:", data.access_token);
    } catch (err) {
      setError("Error fetching access token: " + err.message);
    }
  };

  const handleSearch = async () => {
    if (!query.trim()) return;
    
    if (!accessToken) {
      await fetchAccessToken(); // Get token if not available
    }
    
    setLoading(true);
    setError(null);
    setResults([]);
    setRawJson(null);

    const url = `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=${type}&limit=${limit}`;
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) throw new Error(`Error ${response.status}: Failed to fetch data`);

      const data = await response.json();
      console.log("API Response:", data);
      setRawJson(data);
      setResults(data[type + "s"]?.items || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="search-container">
      <input type="text" placeholder="Search..." value={query} onChange={(e) => setQuery(e.target.value)} />
      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="album">Album</option>
        <option value="artist">Artist</option>
        <option value="track">Track</option>
        <option value="playlist">Playlist</option>
        <option value="show">Podcast</option>
      </select>
      <input type="number" placeholder="Limit" value={limit} onChange={(e) => setLimit(Number(e.target.value))} min="1" />
      <button onClick={handleSearch}>Search</button>

      {loading && <p>Loading...</p>}
      {error && <p className="error">Error: {error}</p>}

      <div className="search-results">
        {results.length > 0 ? (
          results.map((item, index) => (
            <div key={index} className="result-card">
              <img src={item?.images?.[0]?.url || "default-image.jpg"} alt={item?.name || "Unknown"} />
              <h3>{item?.name || "Unknown"}</h3>
            </div>
          ))
        ) : (
          !loading && <p>No results found</p>
        )}
      </div>

      {rawJson && (
        <div className="json-container">
          <h3>Raw JSON Data:</h3>
          <pre>{JSON.stringify(rawJson, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default SpotifySearch;
