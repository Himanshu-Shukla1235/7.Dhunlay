import React, { useRef, useState, useEffect } from "react";
import "./cardsC2.css";
import { PlayCircleIcon } from "lucide-react";
import Tooltip from "@mui/material/Tooltip";
const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60) || 0;
  const secs = Math.floor(seconds % 60) || 0;
  return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
};

const CardC2 = ({ songs }) => {
  const [currentIndex, setCurrentIndex] = useState(null);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRefs = useRef([]);

  // Play the selected audio when currentIndex changes
  useEffect(() => {
    if (currentIndex !== null) {
      const audio = audioRefs.current[currentIndex];
      if (audio) {
        // load metadata then play
        audio.load();
        audio.play().catch((err) => console.error("Playback error:", err));
      }
    }
  }, [currentIndex]);

  const togglePlay = (index) => {
    // If clicking the same index, pause it
    if (index === currentIndex) {
      const audio = audioRefs.current[index];
      audio?.pause();
      setCurrentIndex(null);
      return;
    }

    // Pause any other audio
    audioRefs.current.forEach((a, i) => {
      if (a && i !== index) {
        a.pause();
        a.currentTime = 0;
      }
    });

    // Set new currentIndex to trigger play via useEffect
    setCurrentIndex(index);
  };

  const handleEnded = (index) => {
    if (currentIndex === index) {
      setCurrentIndex(null);
      setProgress(0);
      setCurrentTime(0);
    }
  };

  const handleTimeUpdate = (index) => {
    const audio = audioRefs.current[index];
    if (audio && currentIndex === index) {
      const pct = (audio.currentTime / audio.duration) * 100;
      setProgress(pct || 0);
      setCurrentTime(audio.currentTime || 0);
      setDuration(audio.duration || 0);
    }
  };

  const handleSeek = (e, index) => {
    const audio = audioRefs.current[index];
    if (!audio) return;
    const rect = e.target.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    audio.currentTime = (clickX / rect.width) * audio.duration;
  };

  return (
    <div className="cardC2-main">
      {songs.map((song, index) => {
        const fileUrl = song.songFiles?.[0]?.fileUrl?.[0] || "";
        const isActive = index === currentIndex;
        return (
          <div className="cardC2-loader" key={index}>
            <div className="cardC2-boxes1">
              {new Date(song.createdAt).toLocaleTimeString()}
            </div>
            <div className="cardC2-boxes1">
              {new Date(song.createdAt).toLocaleDateString()}
            </div>
            <div className="cardC2-boxes1">{song.releaseType}</div>
            <div className="cardC2-boxes1">{song.status}</div>

            <div className="cardC2-song">
              <p className="cardC2-name">{song.songTitle}</p>
              <p className="cardC2-artist">{song.primaryArtist?.join(", ")}</p>
            </div>

            {isActive ? (
              <Tooltip title={"Pause"}>
                {" "}
                <div
                  className="cardC2-loading"
                  onClick={() => togglePlay(index)}
                  style={{ cursor: "pointer" }}
                >
                  <div className="cardC2-load"></div>
                  <div className="cardC2-load"></div>
                  <div className="cardC2-load"></div>
                  <div className="cardC2-load"></div>
                </div>
              </Tooltip>
            ) : (
              <Tooltip title={"Play"}>
                <PlayCircleIcon
                  style={{ color: "white", cursor: "pointer" }}
                  onClick={() => togglePlay(index)}
                />
              </Tooltip>
            )}

            <div className="cardC2-albumcover">
              <img
                src={song.coverArt || "https://via.placeholder.com/100"}
                alt="cover"
              />
            </div>

            {fileUrl && (
              <audio
                ref={(el) => (audioRefs.current[index] = el)}
                src={fileUrl}
                onTimeUpdate={() => handleTimeUpdate(index)}
                onLoadedMetadata={() => {
                  const audio = audioRefs.current[index];
                  if (audio && isActive) setDuration(audio.duration || 0);
                }}
                onEnded={() => handleEnded(index)}
              />
            )}
          </div>
        );
      })}

      {currentIndex !== null && (
        <div
          className="cardC2-progress-wrapper"
          onClick={(e) => handleSeek(e, currentIndex)}
        >
          <div className="cardC2-timestamp">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
          <div className="cardC2-progress-container">
            <div
              className="cardC2-progress-bar"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CardC2;
