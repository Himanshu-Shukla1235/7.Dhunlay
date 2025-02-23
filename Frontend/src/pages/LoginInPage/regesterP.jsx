import React, { useState } from "react";
import "./regesterP.css";
import Navbar from "../../components/Navbar/navbarC2";
import Loading from "../../components/Loding/lodingC1";

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
  const countries = ["USA", "India", "Canada", "UK", "Australia"];
  const statesByCountry = {
    USA: ["New York", "California", "Texas"],
    India: ["Madhya Pradesh", "Maharashtra", "Delhi"],
    Canada: ["Ontario", "Quebec", "British Columbia"],
    UK: ["England", "Scotland", "Wales"],
    Australia: ["New South Wales", "Queensland", "Victoria"],
  };

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
      const response = await fetch("http://localhost:3000/api/auth/register", {
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
      window.location.href = `/home/${data.user._id}`;
    } catch (err) {
      setLoading(false);
      setError(err.message || "Something went wrong(Frontend)");
    }
  };

  return (
    <>
      <div className="registerP-nav">
        <div className="logoD">
          {/* <div className="logo"></div> */}
          <h5>
            <span>Dhun</span>
            <span style={{ color: "white" }}>lay</span>
          </h5>
        </div>
        <Navbar></Navbar>
        <div style={{ marginRight: "70px" }}></div>
      </div>

      <div className="registerP-container">
        <form className="registerP-form" onSubmit={handleRegister}>
          <h2>Register</h2>

          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username" // Changed 'id' to 'username'
              value={username} // Using 'username' state
              onChange={(e) => setUsername(e.target.value)} // Changed to 'setUsername'
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="email">Email</label>
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

          <div className="input-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="country">Country</label>
            <select
              id="country"
              value={country}
              onChange={(e) => {
                setCountry(e.target.value);
                setState(""); // Reset state when country changes
              }}
              required
            >
              <option value="">Select Country</option>
              {countries.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div className="input-group">
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

          <button type="submit" className="registerP-button" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
          {error && <p className="registerP-error">{error}</p>}
        </form>
      </div>
    </>
  );
};

export default RegisterPage;
