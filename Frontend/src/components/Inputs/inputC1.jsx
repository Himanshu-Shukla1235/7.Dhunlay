import React from "react";
import "./inputC1.css"; // Ensure you have the corresponding CSS file

const InputC1 = ({
  placeholder, 
  value, 
  onChange, 
  type = "text", 
  width = "100%", 
  required = false
}) => {
  return (
    <div className="form" style={{ width }}>
      <input 
        className="input" 
        placeholder={placeholder} 
        value={value} 
        onChange={onChange} 
        type={type} 
        required={required} 
      />
      <span className="input-border"></span>
    </div>
  );
};

export default InputC1;
