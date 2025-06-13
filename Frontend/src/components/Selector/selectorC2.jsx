import React, { useState, useEffect, useRef } from "react";
import "./selectorC2.css";
import SearchIcon from "@mui/icons-material/Search";

const PrimaryArtistSelector2 = ({ artistNames, selectedArtists, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const didInit = useRef(false);
  const selectedCount = selectedArtists.length;

  // Auto-select all on first non-empty artistNames
  useEffect(() => {
    if (!didInit.current && artistNames.length > 0) {
      onChange("");
      didInit.current = true;
    }
  }, [artistNames, onChange]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".dropdown")) {
        setIsOpen(false);
      }
    };
    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, []);

  const toggleOpen = () => setIsOpen((open) => !open);
  const openDropdown = () => setIsOpen(true);

  const handleSelect = (artist) => {
    if (artist === "All") {
      const allSelected = selectedCount === artistNames.length;
      onChange(allSelected ? [] : artistNames);
    } else if (artist === "None") {
      onChange([""]);
    } else {
      const newSelected = selectedArtists.includes(artist)
        ? selectedArtists.filter((a) => a !== artist)
        : [...selectedArtists, artist];
      onChange(newSelected);
    }
  };

  const filteredArtists = artistNames
    .filter((name) => name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => a.localeCompare(b));

  const displayLabel = () => {
    if (selectedCount === 0) return "None";
    if (selectedCount === artistNames.length) return "All";
    return `${selectedCount } selected`;
  };

  return (
    <div className="selector-container">
      <label htmlFor="artist-select">Select Primary Artists:</label>
      <div className="dropdown">
        <h4
          
          type="button"
          className="dropdown-button"
          onClick={toggleOpen}
        >
          {displayLabel()}
        </h4>

        <div className="selector-search" onClick={openDropdown}>
          <input
            type="text"
            placeholder="Search artists..."
            className="selector-search-input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <SearchIcon
            sx={{
                color:"#00EEFF",
              fontSize: {
                xs: "6vw", // ✅ Phones (extra small)
                sm: "4vw", // ✅ Tablets (small)
                md: "2vw", // ✅ Desktops (medium and up)
              },
              cursor: "pointer",
              transition: "color 0.2s ease",
              "&:hover": {
                color: "#00EEFF",
              },
            }}
            onClick={openDropdown}
          />
        </div>

        {isOpen && (
          <div className="dropdown-content">
            <div
              className={`dropdown-item ${
                selectedCount === artistNames.length ? "selected" : ""
              }`}
              onClick={() => handleSelect("All")}
              title="Select all / deselect all"
            >
              All
            </div>
            <div
              className={`dropdown-item ${
                selectedCount === 0 ? "selected" : ""
              }`}
              onClick={() => handleSelect("None")}
              title="Clear selection"
            >
              None
            </div>
            {filteredArtists.map((name) => (
              <div
                key={name}
                className={`dropdown-item ${
                  selectedArtists.includes(name) ? "selected" : ""
                }`}
                onClick={() => handleSelect(name)}
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

export default PrimaryArtistSelector2;
