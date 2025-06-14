import React from "react";
import "./videoC1.css";

const VideoPage = () => {
  return (
    <div className="video-page">
      <div className="video-wrapper">
        <iframe
          src=""
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default VideoPage;
