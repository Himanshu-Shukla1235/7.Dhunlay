import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import "./resetPassP.css";

const ResetPasswordPage = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const backendAppUrl = import.meta.env.VITE_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!token) {
      setError("Missing or invalid reset token.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${backendAppUrl}/api/forgotPassword/reset/${token}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ newPassword }),
      });

      const data = await res.json();
      if (res.ok) {
        setSuccess(data.message || "Password has been reset successfully.");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        setError(data.message || "Failed to reset password.");
      }
    } catch (err) {
      setError("Server error. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="resetP-container">
      <h2 className="resetP-heading">Reset Your Password</h2>
      <form className="resetP-form" onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
          className="resetP-input"
        />
        <input
          type="password"
          placeholder="Confirm New Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          className="resetP-input"
        />
        <button type="submit" disabled={loading} className="resetP-button">
          {loading ? "Resetting..." : "Reset Password"}
        </button>
        {success && <p className="resetP-success">{success}</p>}
        {error && <p className="resetP-error">{error}</p>}
      </form>
    </div>
  );
};

export default ResetPasswordPage;
