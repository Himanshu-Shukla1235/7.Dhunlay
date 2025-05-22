// BetaBanner.jsx
import React from "react";
import "./messageC2.css"; // optional, if you want to style it separately

const BetaBanner = () => {
  return (
    <>
      <div className="beta-banner">
        <h2>Welcome to Dhunlay!</h2>
        <p>
          We're currently in <strong>beta version</strong>
        </p>
        <p>
          We appreciate your feedback and patience as we work to improve your
          experience.
        </p>
        <p>
          If you encounter any issues or have any suggestions, please{" "}
          <a href="/contact">contact us</a>!
        </p>
        <p>Thank you for being part of our journey.</p>
      </div>

      {/* <div className="beta-banner">
        <h2>Welcome to Dhunlay!</h2>
        <p>
          {" "}
          <strong>You're getting early access to our evolving platform.</strong>
          We're actively refining features, fixing bugs, and building new tools
          — and your experience helps shape what comes next.
        </p>
        <p>
          We genuinely appreciate your feedback and patience as we continue
          improving. If you encounter any issues or have suggestions, please
          don’t hesitate to reach out.
        </p>
        <p>Thank you for being part of our journey.</p>
      </div> */}
    </>
  );
};

export default BetaBanner;
