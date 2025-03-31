import React, { useEffect, useRef } from "react";
import "./drawerleftC1.css";
const LeftDrawer = ({ open, onClose, children }) => {
  const drawerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (drawerRef.current && !drawerRef.current.contains(event.target)) {
        onClose();
      }
    };
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open, onClose]);

  return (
    <div className="drawerleftC1-main"
      ref={drawerRef}
      style={{
        position: "fixed",
        top: 0,
        left: open ? "0" : "-470px",
       
        height: "100%",
    
        color: "white",
        transition: "left 0.3s ease-in-out",
        padding: "7px",
        overflowX: "hidden",
        boxShadow: open ? "2px 0px 5px rgba(0,0,0,0.5)" : "none",
      }}
    >
      {children}
    </div>
  );
};

export default LeftDrawer;
