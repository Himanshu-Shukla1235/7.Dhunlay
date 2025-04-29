// BetaBanner.jsx
import React from 'react';
import './messageC2.css'; // optional, if you want to style it separately

const BetaBanner = () => {
  return (
    <div className="beta-banner">
      <h2>Welcome to Dhunlay!</h2>
      <p>We're currently in <strong>beta</strong> — which means you're getting early access to new features we're still polishing.</p>
      <p>We appreciate your feedback and patience as we work to improve your experience.</p>
      <p>If you encounter any issues or have suggestions, please <a href="/contact">contact us</a>!</p>
      <p>Thank you for being part of our journey.</p>
    </div>
  );
};

export default BetaBanner;
