import React from "react";
import Marquee from "react-fast-marquee";
import "./morque.css"
const MusicPlatformMarquee = ({logos}) => {
  

  return (
    <Marquee>
    <div className="morqueC1-main">{logos.map((logo, index) => (
        <img
        className="morqueC1-img"
          key={index}
          src={logo.src}
          alt={logo.alt}
        />
      ))}</div>
      
    </Marquee>
  );
};

export default MusicPlatformMarquee;
