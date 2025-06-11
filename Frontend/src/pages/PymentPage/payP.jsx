import React from "react";
import { useLocation } from "react-router-dom";
import "./payP.css";

const PaymentPage = () => {
  const backendAppUrl = import.meta.env.VITE_API_URL;
  const location = useLocation();

  // Define amounts per route base path
  const amountMap = {
    "/freemium": 0,
    "/perRelease": 1,
    "/ep-album": 999,
    "/labelPlan": 2999,
  };

  // Extract the base route from pathname, ignoring params
  // e.g. /freemium/123 => /freemium
  const baseRoute = location.pathname.split("/").slice(0, 2).join("/");

  // Get the amount for the matched base route or default to 1
  const amountt = amountMap[baseRoute] || 1;

  const initiatePayment = async () => {
    try {
      const res = await fetch(`${backendAppUrl}/api/initiate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: amountt,
          userId: "user_12345", // Replace with actual user id
        }),
      });

      const data = await res.json();

      if (data.success && data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      } else {
        alert("Payment failed to initialize.");
      }
    } catch (error) {
      console.error("Payment initiation error:", error);
      alert("An error occurred while initiating payment.");
    }
  };

  return (
    <div className="payment-container">
      <h2 className="payment-heading">Make a Payment</h2>
      <p className="payment-description">
        Click the button below to pay ₹{amountt} using PhonePe
      </p>
      <button className="payment-button" onClick={initiatePayment}>
        Pay ₹{amountt}
      </button>
    </div>
  );
};

export default PaymentPage;
