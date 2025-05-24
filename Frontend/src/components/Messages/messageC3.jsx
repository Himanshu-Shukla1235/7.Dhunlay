// EarlyAccess.jsx
import React from "react";
import { Link } from "react-router-dom"; // if you're using React Router
import "./messageC3.css";

const EarlyAccess = () => {
  return (
    <div className="early-access-page">
      <div className="early-access-hero">
        <h1>🚀 Early Access: Dhunlay Premium for Free</h1>
        <p>
          We're excited to offer all premium features FREE for one year to our
          first 50 users!
        </p>
        <Link to="/login" className="early-access-button">
          Get Started Now
        </Link>
      </div>

      {/* <div className="early-access-info">
        <h2>Why Early Access?</h2>
        <p>
          Dhunlay is currently in beta. We're giving our earliest supporters
          full access to premium features so you can experience the best of
          Dhunlay without limitations — and help shape the future of the
          platform.
        </p>

        <h2>What's Included?</h2>
        <ul>
          <li>Unlimited streaming and downloads</li>
          <li>Exclusive early releases</li>
          <li>Ad-free listening experience</li>
          <li>Priority customer support</li>
          <li>More features launching soon!</li>
        </ul>

        <h2>How It Works</h2>
        <p>
          Sign up today and claim your spot. The first 50 users automatically
          get upgraded to Premium — no credit card required.
        </p>

        <div className="cta-bottom">
          <Link
            to="/register
          "
            className="early-access-button"
          >
            Claim Your Free Year
          </Link>
        </div>
      </div> */}
    </div>
  );
};

export default EarlyAccess;
