import React from "react";
import "./videoC1.css";

const VideoPage = () => {
  return (
    <div className="video-page">
      <div className="video-wrapper">
        <iframe
          src="https://www.youtube.com/embed/u5CVsCnxyXg?si=sAxP6ViM-gq6yoWl"
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
