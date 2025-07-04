// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import "./loginP.css";
import Navbar from "../../components/Navbar/navbarC2";

import Loading from "../../components/Loding/loadingC1";
import VideoPage from "../../components/show video/videoC1";
import MusicPlatformMarquee from "../../components/morque/morque";
import ForgotPasswordDialog from "../../components/ForgotPassword/dialogFC1";
import PopupModal from "../../components/popUp/popUp";

const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const backendAppUrl = import.meta.env.VITE_API_URL;
  const [isForgotOpen, setIsForgotOpen] = useState(false);
  const handleSignIn = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch(`${backendAppUrl}/api/auth/login`, {
        method: "POST",
        credentials: "include", // ✅ Allows cookies
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      // setLoading(false);

      if (!response.ok) {
        throw new Error(data.message || "Failed to sign in");
      }

      // ✅ Ensure user data exists and contains an ID
      if (data.user && data.user.id) {
        setTimeout(() => {
          window.location.href = `/dashboard/${data.user.id}`; // ✅ Dynamic redirect
        }, 1500);
      } else {
        throw new Error("User ID not found in response");
      }
    } catch (err) {
      setTimeout(() => {
        setLoading(false);
      }, 1500);

      setError(err.message || "Something went wrong");
    }
  };
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
      src: "https://w7.pngwing.com/pngs/535/720/png-transparent-amazon-music-full-logo-tech-companies.png",
      alt: "SoundCloud",
    },
    {
      src: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/YT_Music.svg/1024px-YT_Music.svg.png",
      alt: "SoundCloud",
    },
    // Add more logos as needed
  ];
  return (
    <>
      <div className="loginP-container">
        <div className="loginP-container-sec-1">
          <p style={{ color: "white", backgroundColor: "transparent" }}>
            Fueling Independent Sound, One Beat at a Time
          </p>
          <h7>
            “Empowering independent artists with seamless music distribution &
            digital tools.”
          </h7>
          <div className="loginP-container-sec-1-video">
            <VideoPage></VideoPage>
          </div>
          <div className="loginP-container-sec-1-morquee">
            {" "}
            <MusicPlatformMarquee logos={logos}></MusicPlatformMarquee>
          </div>
        </div>
        <form className="loginP-form" onSubmit={handleSignIn}>
          <h6 className="loginP-form-head1">
            {" "}
            Log in to Amplify <span style={{ color: "white" }}>
              Your Sound
            </span>{" "}
          </h6>
         

          <div className="input-group">
            <label htmlFor="loginP-email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="loginP-button" disabled={loading}>
            {loading ? <Loading></Loading> : "Log In"}
          </button>
            <a onClick={() => setIsForgotOpen(true)} style={{cursor:"pointer"}}>
              Forgot Password?
            </a>
          <div className="loginP-From-sec-4">
            <p
              style={{
                color: "white",
                opacity: "1",
                backgroundColor: "transparent",
              }}
            >
              or
            </p>
            <a href="/register">Register</a>
          
           
          </div>

          {error && <p className="loginP-error">{error}</p>}
        </form>
         <PopupModal
              isOpen={isForgotOpen}
              onClose={() => setIsForgotOpen(false)}
            >
              <ForgotPasswordDialog></ForgotPasswordDialog>{" "}
            </PopupModal>
      </div>
    </>
  );
};

export default SignInPage;
