import React from "react";
import "./featuresP.css";
const FeaturesP = () => {
  return (
    <>
      <div className="featuresP-main">
        {/* Section 1 */}
        <div className="dashBoard-main-sec-1">
          <div className="dashBoard-main-sec-11">
            <div className="dashBoard-main-sec-11-steping"></div>
            <h2>
              Feat<span style={{ color: "white" }}>ures</span>
            </h2>
          </div>
        </div>
        {/* Section 2 */}
        <div className="featuresP-sec-2">
          <header>
            For <span style={{ color: "#00EEFF" }}>Artists</span>
          </header>
          <p>
            As an artist, your music deserves the spotlight. We make it easy to
            distribute your tracks across all major streaming platforms,
            ensuring fast delivery, real-time analytics, and full royalty
            transparency. Whether you're an emerging talent or an established
            act, we empower you to grow your audience, control your releases,
            and keep ownership of your music.
          </p>
          <a href="./features_artist">Click here</a>
        </div>
        <div className="featuresP-sec-3">
          {" "}
          <header>
            For <span style={{ color: "#00EEFF" }}>Labels</span>
          </header>
          <p>
            For labels, we provide a powerful distribution network built for
            scale. Manage multiple artists and releases effortlessly through our
            centralized dashboard, access detailed performance reports, and
            streamline royalty payouts with precision. Our platform is designed
            to support your label's growth while protecting your rights and
            maximizing your revenue.
          </p>
          <a href="./features_label">Click here </a>
        </div>
      </div>
    </>
  );
};

export default FeaturesP;
