import React from "react";
import "./featuresLabel.css";
import FeatureCard from "../../components/FeaturesCard/featureCard";
import labelFeaturesData from "../../data/labelFeatures.json"; // Import the artist features data

const featuresLabel = () => {
  return (
    <>
      <div className="features-main">
        <div className="features-main-sec-1">
          <div className="features-main-sec-11">
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
      </div>
    </>
  );
};

export default featuresLabel;
