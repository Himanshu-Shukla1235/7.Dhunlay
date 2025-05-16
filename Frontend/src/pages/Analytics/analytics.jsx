import React from "react";
import "./analytics.css"; // Import the CSS file
import FeatureUnavailable from "../../components/Messages/messageC1";
const analytics = () => {
  return (
    <div className="analytics-main">
      {/* Section 1 */}
      <div className="analytics-main-sec-1">
        <div className="analytics-main-sec-11">
          <div className="analytics-main-sec-11-steping">
           
          </div>
          <h2>
            Analy<span style={{ color: "white" }}>tics</span>
          </h2>
        </div>
      </div>
      <div className="analytics-main-sec-2"><p><FeatureUnavailable></FeatureUnavailable></p></div>
    </div>
  );
};

export default analytics;
