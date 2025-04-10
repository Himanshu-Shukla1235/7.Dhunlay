// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import "./loginP.css";
import Navbar from "../../components/Navbar/navbarC2";

import Loading from "../../components/Loding/loadingC1";
import VideoPage from "../../components/show video/videoC1";

const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSignIn = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:3000/api/auth/login", {
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
          window.location.href = `/home/${data.user.id}`; // ✅ Dynamic redirect
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
            <VideoPage className="videoP"></VideoPage>
          </div>
          <div className="marquee-container">
      <div className="marquee-track">
        {/* Repeat your images to make seamless scroll */}
        <img src="https://storage.googleapis.com/pr-newsroom-wp/1/2023/05/Spotify_Primary_Logo_RGB_Green.png" alt="img1" />
        <img src="" alt="img2" />
        <img src="/images/img3.png" alt="img3" />
        <img src="/images/img4.png" alt="img4" />
        <img src="/images/img5.png" alt="img5" />
        <img src="/images/img6.png" alt="img6" />

        {/* Repeating again for smooth loop */}
        <img src="/images/img1.png" alt="img1" />
        <img src="/images/img2.png" alt="img2" />
        <img src="/images/img3.png" alt="img3" />
        <img src="/images/img4.png" alt="img4" />
        <img src="/images/img5.png" alt="img5" />
        <img src="/images/img6.png" alt="img6" />
      </div>
    </div>
        </div>
        <form className="loginP-form" onSubmit={handleSignIn}>
          <h6 className="loginP-form-head1">
            {" "}
            Log in to Amplify <span style={{ color: "white" }}>
              Your Sound
            </span>{" "}
          </h6>
          <h2>
            <span
              style={{ backgroundColor: "transparent", color: "#00EEFF" }}
            ></span>{" "}
          </h2>

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
          {error && <p className="loginP-error">{error}</p>}
        </form>
      </div>
    </>
  );
};

export default SignInPage;
