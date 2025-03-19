import React from "react";
import "./buttonC1.css";

const ButtonC1 = ({ content, onClick, disabled = false, type = "button", className = "", style = {} }) => {
  return (
    <button
      className={`buttonC1 ${className}`} 
      onClick={onClick} 
      disabled={disabled} 
      type={type}
      style={style}
    >
      {content}
    </button>
  );
};

export default ButtonC1;
