import React from "react";
import "./tooltip.css";

const CustomTooltip = ({ image, text }) => {
  return (
    <div className="dhunlay-tooltip">
      {image && <img src={image} alt="tooltip visual" className="tooltip-image" />}
      <div className="tooltip-text">{text}</div>
    </div>
  );
};

export default CustomTooltip;
