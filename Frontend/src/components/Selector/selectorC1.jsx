import React, { useState, useEffect, useRef } from "react";
import "./selectorC1.css";

const PrimaryArtistSelector = ({ artistNames, selectedArtists, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const didInit = useRef(false);
  const none = [];
  const selected = selectedArtists.length - 1;

  // Only auto‑select all on the very first time artistNames beomes non‑empty
  useEffect(() => {
    if (!didInit.current && artistNames.length > 0) {
      onChange(artistNames);
      didInit.current = true;
    }
  }, [artistNames, onChange]);

  const toggleDropdown = () => setIsOpen((open) => !open);
  const toggleDropdown1 = () => setIsOpen((open) => true);
  const toggleDropdown2 = () => setIsOpen((open) => false);
  useEffect(() => {
    const handleClick = () => {
      setIsOpen(false);
    };

    window.addEventListener("click", handleClick);

    // Cleanup on unmount
    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, []);

  const handleSelect = (artist) => {
    if (artist === "All") {
      const allSelected = selectedArtists.length === artistNames.length;
      onChange(allSelected ? [""] : artistNames);
      return;
    }

    if (artist === "None") {
      onChange([""]); // Deselect all

      return;
    }

    // Toggle single artist
    const newSelected = selectedArtists.includes(artist)
      ? selectedArtists.filter((a) => a !== artist)
      : [...selectedArtists, artist];
    onChange(newSelected);
  };

  const filteredArtists = artistNames
    .filter((name) => name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => a.localeCompare(b));

  return (
    <div className="selector-container">
      <label htmlFor="artist-select">Select Artists:</label>
      <div className="dropdown">
        <button id="artist-select" className="dropdown-button">
          {selectedArtists.length === 0
            ? "None"
            : selectedArtists.length === artistNames.length
            ? "All"
            : `${selected} selected`}
        </button>
        <input
          type="text"
          placeholder="Search artists..."
          className="dropdown-search"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);

            toggleDropdown1();
          }}
          onClick={toggleDropdown}
        />
        {isOpen && (
          <div className="dropdown-content">
            {/* Select All / Deselect All */}
            <div
              className={`dropdown-item ${
                selectedArtists.length === artistNames.length ? "selected" : ""
              }`}
              onClick={() => {
                handleSelect("All");
                toggleDropdown();
              }}
              title="Click to select all / deselect all"
            >
              All
            </div>

            {/* Clear Selection */}
            <div
              className={`dropdown-item ${
                selectedArtists.length === 0 ? "selected" : ""
              }`}
              onClick={() => {
                handleSelect("None");
      
              }}
              title="Click to clear selection"
            >
              None
            </div>

            {/* Individual Artists */}
            {filteredArtists.map((name) => (
              <div
                key={name}
                className={`dropdown-item ${
                  selectedArtists.includes(name) ? "selected" : ""
                }`}
                onClick={() => {
                  handleSelect(name);
                 
                }}
              >
                {name}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PrimaryArtistSelector;
