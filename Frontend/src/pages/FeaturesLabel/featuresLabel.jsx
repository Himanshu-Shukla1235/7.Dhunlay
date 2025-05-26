import React from "react";
import "./featuresLabel.css";
import FeatureCard from "../../components/FeaturesCard/featureCard";
import labelFeaturesData from "../../data/labelFeatures.json"; // Import the artist features data
import UpcomingFeatureCard from "../../components/UpcomingFeatureCard/upcomingFeatureCard";
import upcomingLabelFeaturesData from "../../data/upcomingLabelFeatures.json"; // Import the artist features data
import Stacking from "../../components/stacking element/stacking";
import Footer_2 from "../../components/Footer/footerC2";

const featuresLabel = () => {
  return (
    <>
      <div className="features-main">
        <div className="features-main-sec-1">
          <div className="features-main-sec-11">
            <div className="heading">
              <div className="heading-stacking">
                <Stacking />
              </div>
              <h4>
                Fea<span style={{ color: "white" }}>tures</span>
              </h4>
            </div>

            <h2>The Ultimate Horizons in Label Services.</h2>
            <h3>
              Empowering labels with innovative tools and resources to manage,
              promote, and grow their artists, ensuring success at every stage.
            </h3>
          </div>

          <div className="features-main-sec-12">
            {/* Pass the artistFeaturesData to FeatureCard */}
            <FeatureCard data={labelFeaturesData} />
          </div>
        </div>

        <div className="division"></div>
        {/* using to divide the two sections */}

        <div className="features-main-sec-2">
          <h2>The upcoming features.</h2>
          <div className="features-main-sec-21">
            <UpcomingFeatureCard data={upcomingLabelFeaturesData} />
          </div>
        </div>

        <div className="features-main-sec-3">
          <Footer_2 />
        </div>
      </div>
    </>
  );
};

export default featuresLabel;
