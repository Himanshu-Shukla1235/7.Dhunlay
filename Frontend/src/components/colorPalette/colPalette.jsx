import React, { useState } from "react";
import "./colPalette.css";

const colors = [
  "#264653", 
   "#00EEFF","#0000002F","#FFD700","#00eeff"
];

const Palette = () => {
  const [copied, setCopied] = useState(null);

  const copyToClipboard = (color) => {
    navigator.clipboard.writeText(color);
    setCopied(color);
    setTimeout(() => setCopied(null), 1500); // Reset copied state
  };

  return (
    <div className="colPalette-container">
      <div className="colPalette-palette">
        {colors.map((color, index) => (
          <div
            key={index}
            className="colPalette-color"
            style={{ background: color }}
            onClick={() => copyToClipboard(color)}
          >
            <span>{color}</span>
            {copied === color && <div className="colPalette-copied-message">Copied!</div>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Palette;
