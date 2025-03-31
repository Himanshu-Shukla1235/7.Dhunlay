import React, { useState } from "react";
import "./getMyProfile.css";

const ArtistInfo = () => {
    const [artistId, setArtistId] = useState("");
    const [artist, setArtist] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [rawJson, setRawJson] = useState(null); // Store full JSON response

    const fetchArtist = async () => {
        if (!artistId) return;
        setLoading(true);
        setError(null);
        setArtist(null);
        setRawJson(null); // Reset previous JSON data

        const url = `https://spotify23.p.rapidapi.com/artists/?ids=${artistId}`;
        const options = {
            method: "GET",
            headers: {
                "x-rapidapi-key": "d8cd4583e0msh5da198a5cabe78cp17051cjsn3e8d0135eafd",
                "x-rapidapi-host": "spotify23.p.rapidapi.com"
            }
        };

        try {
            const response = await fetch(url, options);
            if (!response.ok) throw new Error("Failed to fetch artist data");

            const data = await response.json();
            setRawJson(data); // Store full JSON response
            setArtist(data?.artists?.[0] || null);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="artist-container">
            <input
                type="text"
                placeholder="Enter Artist ID"
                value={artistId}
                onChange={(e) => setArtistId(e.target.value)}
            />
            <button onClick={fetchArtist}>Fetch Artist</button>

            {loading && <p>Loading...</p>}
            {error && <p className="error">Error: {error}</p>}

            {artist && (
                <div className="artist-card">
                    <img src={artist?.images?.[0]?.url || "default-image.jpg"} alt={artist?.name || "Unknown"} className="artist-image" />
                    <h2>{artist?.name || "Unknown"}</h2>
                    <p>Followers: {artist?.followers?.total?.toLocaleString() || "N/A"}</p>
                    <p>Genres: {artist?.genres?.join(", ") || "N/A"}</p>
                </div>
            )}

            {/* Display Raw JSON Data */}
            {rawJson && (
                <div className="json-container">
                    <h3>Raw JSON Data:</h3>
                    <pre>{JSON.stringify(rawJson, null, 2)}</pre>
                </div>
            )}
        </div>
    );
};

export default ArtistInfo;
