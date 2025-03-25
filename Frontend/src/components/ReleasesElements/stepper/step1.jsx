import { useState, useEffect } from "react";
import { IconButton, TextField, Button } from "@mui/material";
import { AddCircle as AddCircleIcon, RemoveCircle as RemoveCircleIcon, CloudUpload as CloudUploadIcon } from "@mui/icons-material";
import "./"
const Step1 = ({ formDataPost, setFormDataPost }) => {
  // Initialize songDetails separately
  const [songDetails, setSongDetails] = useState({
    songName: formDataPost.songName || "",
    primaryArtists: formDataPost.primaryArtists || [""],
    featuringArtists: formDataPost.featuringArtists || [""],
    authors: formDataPost.authors || [""],
    composers: formDataPost.composers || [""],
    musicProducers: formDataPost.musicProducers || [""],
    musicDirectors: formDataPost.musicDirectors || [""],
    lyrics: formDataPost.lyrics || "",
    lyricsFile: formDataPost.lyricsFile || null,
  });

  // Sync songDetails to formDataPost whenever it changes
  useEffect(() => {
    setFormDataPost(songDetails);
  }, [songDetails, setFormDataPost]);

  // Handle text input changes
  const handleChange = (field, value) => {
    setSongDetails((prev) => ({ ...prev, [field]: value }));
  };

  // Handle adding a new input field
  const handleAddField = (field) => {
    setSongDetails((prev) => ({
      ...prev,
      [field]: [...prev[field], ""],
    }));
  };

  // Handle removing an input field
  const handleRemoveField = (field, index) => {
    setSongDetails((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  };

  // Handle lyrics file upload
  const handleLyricsUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSongDetails((prev) => ({ ...prev, lyricsFile: file }));
    }
  };

  return (
    <div className="step1-main">
      <h2 style={{ color: "#00eeffc3", fontFamily: "sans-serif", fontWeight: "lighter" }}>
        Step 1: Enter Song Details
      </h2>

      {/* Song Title */}
      <label className="step1-label-1">Song Name:</label>
      <InputC1
        placeholder="Enter the Title"
        value={songDetails.songName}
        onChange={(e) => handleChange("songName", e.target.value)}
      />
      <br />

      {/* Dynamic Fields with Add/Remove Options */}
      {[
        { label: "Primary Artist", field: "primaryArtists" },
        { label: "Featuring Artist", field: "featuringArtists" },
        { label: "Author", field: "authors" },
        { label: "Composer", field: "composers" },
        { label: "Music Producer", field: "musicProducers" },
        { label: "Music Director", field: "musicDirectors" },
      ].map(({ label, field }) => (
        <div key={field}>
          <label className="step1-label-2">{label}(s):</label>
          {songDetails[field].map((value, index) => (
            <div key={index} style={{ display: "flex", alignItems: "center", gap: "0.5vw", marginBottom: "1vw" }}>
              <InputC1
                placeholder={`Enter ${label} Name`}
                value={value}
                onChange={(e) => {
                  const newValues = [...songDetails[field]];
                  newValues[index] = e.target.value;
                  handleChange(field, newValues);
                }}
              />
              {songDetails[field].length > 1 && (
                <IconButton color="error" onClick={() => handleRemoveField(field, index)}>
                  <RemoveCircleIcon />
                </IconButton>
              )}
            </div>
          ))}
          <IconButton color="primary" onClick={() => handleAddField(field)}>
            <AddCircleIcon sx={{ color: "grey" }} />
          </IconButton>
        </div>
      ))}

      {/* Lyrics Section */}
      <label className="step1-label" style={{ color: "white" }}>
        <p sx={{ fontFamily: "sans-serif" }}>Lyrics (if any):</p>
      </label>
      <TextField
        label="Write Lyrics"
        placeholder="Type your lyrics here..."
        multiline
        rows={4}
        variant="outlined"
        fullWidth
        value={songDetails.lyrics}
        onChange={(e) => handleChange("lyrics", e.target.value)}
        sx={{
          "& .MuiInputBase-input::placeholder": { color: "white", opacity: 1 },
          "& .MuiOutlinedInput-root": { color: "white", borderColor: "rgba(255, 255, 255, 0.5)" },
          "& .MuiInputLabel-root": { color: "rgba(255, 255, 255, 0.7)" },
          "& .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(255, 255, 255, 0.5)" },
        }}
        style={{ marginBottom: "1vw" }}
      />

      {/* File Input */}
      <input
        type="file"
        accept=".txt,.doc,.pdf"
        id="upload-lyrics"
        style={{ display: "none" }}
        onChange={handleLyricsUpload}
      />

      <label htmlFor="upload-lyrics">
        <Button variant="contained" component="span" startIcon={<CloudUploadIcon />} color="primary">
          Upload Lyrics File
        </Button>
      </label>
      {songDetails.lyricsFile && <p>Uploaded: {songDetails.lyricsFile.name}</p>}
      <br />
    </div>
  );
};

export default Step1;
