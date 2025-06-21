import React from "react";
import "./popUp.css";

const PopupModal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <button className="popup-close-button " onClick={onClose}>×</button>
        {children}
      </div>
    </div>
  );
};

export default PopupModal;
