import React, { useState } from "react";
import "./loginP.css";
import Navbar from "../../components/Navbar/navbarC2";

import Loading from "../../components/Loding/loadingC1";

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
      <div className="loginP-nav">
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

      <div className="loginP-container">
        <form className="loginP-form" onSubmit={handleSignIn}>
          <h2>Sign In</h2>

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
            {loading ? <Loading></Loading> : "Sign In"}
          </button>
          {error && <p className="loginP-error">{error}</p>}
        </form>
      </div>
    </>
  );
};

export default SignInPage;
