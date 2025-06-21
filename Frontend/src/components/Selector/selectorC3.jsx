import React, { useState } from "react";
import "./selectorC3.css";

const ArtistSelector = ({ artistNames }) => {
  const [selectedArtists, setSelectedArtists] = useState([]);

  const handleChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions).map(
      (option) => option.value
    );
    setSelectedArtists(selectedOptions);
  };

  return (
    <div className="artist-selector">
      <label className="selector-label">Select Artists:</label>
      <select
        multiple
        className="artist-select"
        value={selectedArtists}
        onChange={handleChange}
      >
        {artistNames.map((artist) => (
          <option key={artist} value={artist}>
            {artist}
          </option>
        ))}
      </select>

      <div className="selected-info">
        <strong>{selectedArtists.length}</strong> selected
      </div>

      <div className="selected-tags">
        {selectedArtists.map((artist) => (
          <span key={artist} className="tag">
            {artist}
            <button onClick={() =>
              setSelectedArtists(selectedArtists.filter((a) => a !== artist))
            }>
              ×
            </button>
          </span>
        ))}
      </div>
    </div>
  );
};

export default ArtistSelector;
