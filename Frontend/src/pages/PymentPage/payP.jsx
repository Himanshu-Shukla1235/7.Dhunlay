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

  // Extract the full pathname, e.g. "/freemium/67cf231b6ecb1651b542617a"
  const pathSegments = location.pathname.split("/"); // ['', 'freemium', '67cf231b6ecb1651b542617a']
  const baseRoute = `/${pathSegments[1]}`; // '/freemium'
  const userId = pathSegments[2]; // '67cf231b6ecb1651b542617a'

  const amountt = amountMap[baseRoute] || 1;

  const initiatePayment = async () => {
    try {
      const res = await fetch(`${backendAppUrl}/api/initiate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: amountt,
          userId: userId, // now dynamically extracted
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
