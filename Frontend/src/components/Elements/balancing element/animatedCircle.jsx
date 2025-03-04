import { motion } from "framer-motion";
import { useState } from "react";
import "./animatedCircle.css";

const HoverCircle = () => {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="container">
      <motion.div
        className="circle"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {hovered && (
          <motion.div
            className="hover-border"
            initial={{ scale: 0, opacity: 0, rotate: 0 }}
            animate={{ scale: 1.2, opacity: 1, rotate: 360 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.5 }}
          />
        )}
      </motion.div>
    </div>
  );
};

export default HoverCircle;
