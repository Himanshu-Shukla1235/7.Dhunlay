import React from "react";
import LoadingC2 from "./Loding/loadingC2";
import VideoPage from "./show video/videoC1";
import MusicPlatformMarquee from "./morque/morque";

const Test = () => {
  const logos = [
    {
      src: "https://music-row-website-assets.s3.amazonaws.com/wp-content/uploads/2018/11/10155527/Apple-Music-Logo-FB.png",
      alt: "Spotify",
    },
    {
      src: "https://newsroom.spotify.com/wp-content/themes/ftr/assets/images/Spotify_Logo_RGB_Green.png",
      alt: "Apple Music",
    },
    {
      src: "https://m.media-amazon.com/images/G/01/AmazonMusic/Logos/Parent/Amazon_Music_Black.png",
      alt: "SoundCloud",
    },
    // Add more logos as needed
  ];
  return (
    <>
      <div className="test">
        <UpsertPrimaryArtistForm></UpsertPrimaryArtistForm>
      
      </div>
    </>
  );
};

export default Test;
