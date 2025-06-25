import React, { useState } from "react";

import "./regesterP.css";
import Navbar from "../../components/Navbar/navbarC2";
import Loading from "../../components/Loding/loadingC1";
import MusicPlatformMarquee from "../../components/morque/morque";
const RegisterPage = () => {
  const [username, setUsername] = useState(""); // Changed to 'setUsername'
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // List of countries and states
  const countries = ["USA", "India", , "UK", "Australia"];
  const statesByCountry = {
    USA: ["New York", "California", "Texas"],
    India: [
      "Andhra Pradesh",
      "Arunachal Pradesh",
      "Assam",
      "Bihar",
      "Chhattisgarh",
      "Goa",
      "Gujarat",
      "Haryana",
      "Himachal Pradesh",
      "Jharkhand",
      "Karnataka",
      "Kerala",
      "Madhya Pradesh",
      "Maharashtra",
      "Manipur",
      "Meghalaya",
      "Mizoram",
      "Nagaland",
      "Odisha",
      "Punjab",
      "Rajasthan",
      "Sikkim",
      "Tamil Nadu",
      "Telangana",
      "Tripura",
      "Uttar Pradesh",
      "Uttarakhand",
      "West Bengal",
      // Union Territories (Optional, remove if not needed)

      "Chandigarh",

      "Delhi",
      "Jammu and Kashmir",
      "Ladakh",
      "Lakshadweep",
      "Puducherry",
    ],
    Canada: ["Ontario", "Quebec", "British Columbia"],
    UK: ["England", "Scotland", "Wales"],
    Australia: ["New South Wales", "Queensland", "Victoria"],
  };

  const backendAppUrl = import.meta.env.VITE_API_URL;
  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (
      !username ||
      !email ||
      !password ||
      !confirmPassword ||
      !country ||
      !state
    ) {
      setLoading(false);
      setError("All fields are required");
      return;
    }

    if (password !== confirmPassword) {
      setLoading(false);
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await fetch(`${backendAppUrl}/api/auth/register`, {
        method: "POST",
        credentials: "include", // ✅ Allows cookies
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password, country, state }),
      });

      const data = await response.json();
      setLoading(false);

      if (!response.ok) {
        throw new Error(data.message || "Failed to register");
      }

      // localStorage.setItem("token", data.token);
      // window.location.href = `/dashboard/${data.user._id}`;
      alert(
        `A verification email has been sent to ${email}. Please check your inbox to complete the registration.`
      );
    } catch (err) {
      setLoading(false);
      setError(err.message || "Something went wrong(Frontend)");
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
      <div className="registerP-main">
        <div className="registerP-main-sec1"></div>
        <div className="registerP-container">
          {/* <div className="regesterP-container-logo"></div> */}
          <div className="registerP-container-title">
            <h2>You Bring the Passion. We Bring the Platform.</h2>
            <p></p>
          </div>
          <form className="registerP-form" onSubmit={handleRegister}>
            <div className="registerP-form-sec1">
              {" "}
              <div className="registerP-form-sec11">
                {" "}
                <div className="registerP-input-group">
                  <label htmlFor="username">Username</label>
                  <input
                    type="text"
                    id="username" // Changed 'id' to 'username'
                    value={username} // Using 'username' state
                    onChange={(e) => setUsername(e.target.value)} // Changed to 'setUsername'
                    required
                  />
                </div>
                <div className="registerP-input-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="registerP-input-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="registerP-input-group">
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="registerP-form-sec12">
                <div className="registerP-input-group">
                  <label htmlFor="country">Country</label>
                  <select
                    id="country"
                    value={country}
                    onChange={(e) => {
                      setCountry(e.target.value);
                      setState(""); // Reset state when country changes
                    }}
                    required
                    className="styled-dropdown"
                  >
                    <option value="">Select Country</option>
                    {countries.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="registerP-input-group">
                  <label htmlFor="state">State</label>
                  <select
                    id="state"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    required
                    disabled={!country} // Disable state if no country is selected
                  >
                    <option value="">Select State</option>
                    {statesByCountry[country]?.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="registerP-button"
              disabled={loading}
            >
              {loading ? "Registering..." : "Register"}
            </button>

            {error && <p className="registerP-error">{error}</p>}
          </form>
          <div className="registerP-policy">
            {" "}
            <p>
              By logging in, you agree to our <a href="/policy">Terms</a> and{" "}
              <a href="/policy">Privacy Policy</a>
            </p>
          </div>
          <div className="registerP-morque">
            <MusicPlatformMarquee logos={logos}></MusicPlatformMarquee>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
