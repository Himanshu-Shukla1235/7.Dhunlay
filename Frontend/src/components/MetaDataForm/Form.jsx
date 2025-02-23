import React, { useState } from "react";

import "./Form.css";

const SongForm = () => {
  const [formData, setFormData] = useState({
    songTitle: "",
    primaryArtist: "",
    featuringArtists: "",
    author: "",
    composer: "",
    musicProducer: "",
    musicDirector: "",
    lyrics: "",
    coverArt: null,
    songFile: null,
    releaseDate: "",
    genres: "",
    language: "",
    explicitContent: false,
    distributionPlatforms: "",
    isrc: "",
    upc: "",
    bpm: "",
    key: "",
    mood: "",
    userId: "",
    email: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Handle Input Changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Handle File Inputs
  const handleFileChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.files[0] });
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const songData = new FormData();
      for (const key in formData) {
        songData.append(key, formData[key]);
      }

      const response = await fetch(
        "http://localhost:3000/api/metadata/meta",
        {
          method: "POST",
          body: songData,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Error submitting song");
      }

      setMessage(data.message);

      setFormData({
        songTitle: "",
        primaryArtist: "",
        featuringArtists: "",
        author: "",
        composer: "",
        musicProducer: "",
        musicDirector: "",
        lyrics: "",
        coverArt: null,
        songFile: null,
        releaseDate: "",
        genres: "",
        language: "",
        explicitContent: false,
        distributionPlatforms: "",
        isrc: "",
        upc: "",
        bpm: "",
        key: "",
        mood: "",
        userId: "",
        email: "",
      });
    } catch (error) {
      setMessage(error.message);
    
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-800 text-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Submit a Song</h2>
      {message && <p className="mb-4 text-center text-lg">{message}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Song Title */}
        <input
          type="text"
          name="songTitle"
          placeholder="Song Title"
          value={formData.songTitle}
          onChange={handleChange}
          required
          className="input"
        />

        {/* Primary Artist */}
        <input
          type="text"
          name="primaryArtist"
          placeholder="Primary Artist"
          value={formData.primaryArtist}
          onChange={handleChange}
          required
          className="input"
        />

        {/* Featuring Artists */}
        <input
          type="text"
          name="featuringArtists"
          placeholder="Featuring Artists (comma-separated)"
          value={formData.featuringArtists}
          onChange={handleChange}
          className="input"
        />

        {/* Author, Composer, Music Producer, Music Director */}
        <input
          type="text"
          name="author"
          placeholder="Author"
          value={formData.author}
          onChange={handleChange}
          required
          className="input"
        />
        <input
          type="text"
          name="composer"
          placeholder="Composer"
          value={formData.composer}
          onChange={handleChange}
          required
          className="input"
        />
        <input
          type="text"
          name="musicProducer"
          placeholder="Music Producer"
          value={formData.musicProducer}
          onChange={handleChange}
          required
          className="input"
        />
        <input
          type="text"
          name="musicDirector"
          placeholder="Music Director"
          value={formData.musicDirector}
          onChange={handleChange}
          required
          className="input"
        />

        {/* Lyrics */}
        <textarea
          name="lyrics"
          placeholder="Lyrics"
          value={formData.lyrics}
          onChange={handleChange}
          className="input"
        ></textarea>

        {/* Cover Art Upload */}
        <input
          type="file"
          name="coverArt"
          onChange={handleFileChange}
          accept="image/*"
          required
          className="file-input"
        />

        {/* Song File Upload */}
        <input
          type="file"
          name="songFile"
          onChange={handleFileChange}
          accept="audio/*"
          required
          className="file-input"
        />

        {/* Release Date */}
        <input
          type="date"
          name="releaseDate"
          value={formData.releaseDate}
          onChange={handleChange}
          required
          className="input"
        />

        {/* Genres */}
        <input
          type="text"
          name="genres"
          placeholder="Genres (comma-separated)"
          value={formData.genres}
          onChange={handleChange}
          required
          className="input"
        />

        {/* Language */}
        <input
          type="text"
          name="language"
          placeholder="Language"
          value={formData.language}
          onChange={handleChange}
          required
          className="input"
        />

        {/* Explicit Content */}
        <label className="flex items-center">
          <input
            type="checkbox"
            name="explicitContent"
            checked={formData.explicitContent}
            onChange={handleChange}
            className="checkbox"
          />
          <span className="ml-2">Explicit Content</span>
        </label>

        {/* Distribution Platforms */}
        <input
          type="text"
          name="distributionPlatforms"
          placeholder="Distribution Platforms (comma-separated)"
          value={formData.distributionPlatforms}
          onChange={handleChange}
          required
          className="input"
        />

        {/* Metadata */}
        <input
          type="text"
          name="isrc"
          placeholder="ISRC"
          value={formData.isrc}
          onChange={handleChange}
          required
          className="input"
        />
        <input
          type="text"
          name="upc"
          placeholder="UPC"
          value={formData.upc}
          onChange={handleChange}
          required
          className="input"
        />
        <input
          type="number"
          name="bpm"
          placeholder="BPM"
          value={formData.bpm}
          onChange={handleChange}
          required
          className="input"
        />
        <input
          type="text"
          name="key"
          placeholder="Key (e.g., C Major)"
          value={formData.key}
          onChange={handleChange}
          required
          className="input"
        />
        <input
          type="text"
          name="mood"
          placeholder="Mood (e.g., Happy, Sad)"
          value={formData.mood}
          onChange={handleChange}
          required
          className="input"
        />

        {/* Submit Button */}
        <button type="submit" className="btn" disabled={loading}>
          {loading ? "Submitting..." : "Submit Song"}
        </button>
      </form>
    </div>
  );
};

export default SongForm;
