import React, { useRef, useState } from "react";
import "./cardsC2.css";
import { PlayCircleIcon } from "lucide-react";

const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60) || 0;
  const secs = Math.floor(seconds % 60) || 0;
  return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
};
const songList = [
  {
    title: "Time in a Bottle",
    artist: "Jim Croce",
    src: "https://res.cloudinary.com/dysuiz4wn/video/upload/v1744724798/qyxvb2qu2sbmxedpdnhf.wav",
    img: "https://th.bing.com/th/id/OIP.sCBoG9rm9xfG4pCFv5rMkQHaE7?w=509&h=339&rs=1&pid=ImgDetMain",
  },
  // add more...
];

const CardC2 = ({ songs }) => {
  const [currentIndex, setCurrentIndex] = useState(null);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRefs = useRef([]);

  const togglePlay = (index) => {
    const audio = audioRefs.current[index];
    if (!audio) return;

    audioRefs.current.forEach((a, i) => {
      if (i !== index && a) {
        a.pause();
        a.currentTime = 0;
      }
    });

    if (audio.paused) {
      audio.play();
      setCurrentIndex(index);
      setDuration(audio.duration || 0);
    } else {
      audio.pause();
      setCurrentIndex(null);
    }
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
      const percentage = (audio.currentTime / audio.duration) * 100;
      setProgress(percentage || 0);
      setCurrentTime(audio.currentTime || 0);
      setDuration(audio.duration || 0);
    }
  };

  const handleSeek = (e, index) => {
    const audio = audioRefs.current[index];
    if (!audio) return;

    const rect = e.target.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const seekTime = (clickX / width) * audio.duration;
    audio.currentTime = seekTime;
  };

  return (
    <div className="cardC2-main">
      {songs.map((song, index) => (
        <div className="cardC2-loader" key={index}>
          {" "}
          <div className="cardC2-boxes1">
            {new Date(song.createdAt).toLocaleTimeString()} {/* shows time */}
          </div>
          <div className="cardC2-boxes1">
            {new Date(song.createdAt).toLocaleDateString()} {/* shows date */}
          </div>
          <div className="cardC2-boxes1">0</div>
          <div className="cardC2-boxes1">{song.status}</div>
          <div className="cardC2-song">
            <p className="cardC2-name">{song.songTitle}</p>
            <p className="cardC2-artist">{song.primaryArtist?.join(", ")}</p>
          </div>
          {currentIndex === index ? (
            <div className="cardC2-loading" onClick={() => togglePlay(index)}>
              <div className="cardC2-load"></div>
              <div className="cardC2-load"></div>
              <div className="cardC2-load"></div>
              <div className="cardC2-load"></div>
            </div>
          ) : (
            <PlayCircleIcon
              style={{ color: "white", cursor: "pointer" }}
              onClick={() => togglePlay(index)}
            />
          )}{" "}
          <div className="cardC2-albumcover">
            <img src={song.coverArt} alt={`${"no"} cover`} />
          </div>
          <audio
            ref={(el) => (audioRefs.current[index] = el)}
            src={song.songFile.fileUrl}
            onTimeUpdate={() => handleTimeUpdate(index)}
            onLoadedMetadata={() => {
              const audio = audioRefs.current[index];
              if (audio && index === currentIndex) {
                setDuration(audio.duration || 0);
              }
            }}
            onEnded={() => handleEnded(index)}
          />
        </div>
      ))}

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
