// React Component
import { useEffect } from "react";

const GoogleLoginButton = () => {
  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: "YOUR_CLIENT_ID", // 🔁 Replace with your actual client ID
      callback: handleCredentialResponse,
    });
    google.accounts.id.renderButton(
      document.getElementById("google-signin"),
      { theme: "outline", size: "large" }
    );
  }, []);

  const handleCredentialResponse = async (response) => {
    console.log("JWT ID Token: ", response.credential);

    try {
      const res = await fetch("http://localhost:5000/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: response.credential, // 🔐 Sending ID token
        }),
      });

      const data = await res.json();

      if (res.ok) {
        console.log("✅ Login success:", data);
        // 🔁 Save user/session data if needed
      } else {
        console.error("❌ Login failed:", data);
      }
    } catch (err) {
      console.error("⚠️ Error sending token to backend:", err);
    }
  };

  return <div id="google-signin"></div>;
};

export default GoogleLoginButton;
