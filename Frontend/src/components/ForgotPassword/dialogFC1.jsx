import React, { useState } from "react";
import "./dialogFC1.css";

const ForgotPasswordPost = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const backendAppUrl = import.meta.env.VITE_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");
    setError("");

    try {
      const response = await fetch(`${backendAppUrl}/api/forgotPassword/request`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();
      if (response.ok) {
        setSuccess(result.message || "Reset link sent.");
      } else {
        setError(result.message || "Something went wrong.");
      }
    } catch (err) {
      setError("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dialogFC1-container">
      <h2 className="dialogFC1-heading">Forgot Password</h2>
      <form className="dialogFC1-form" onSubmit={handleSubmit}>
        <input
          className="dialogFC1-input"
          type="email"
          name="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button className="dialogFC1-button" type="submit" disabled={loading}>
          {loading ? "Sending..." : "Send Reset Link"}
        </button>
        {success && <p className="dialogFC1-success">{success}</p>}
        {error && <p className="dialogFC1-error">{error}</p>}
      </form>
    </div>
  );
};

export default ForgotPasswordPost;
