import React from "react";
import "./videoC2.css";

const videoPageC2 = ({vid_src}) => {
  return (
    <div className="videoC2-page">
      <div className="videoC2-wrapper">
        <iframe
          src={vid_src}
          title="Demo video "
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default videoPageC2;
