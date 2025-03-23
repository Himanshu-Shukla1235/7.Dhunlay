import React from "react";
import "./featuresArtist.css";
import FeatureCard from "../../components/FeaturesCard/featureCard";
import artistFeaturesData from "../../data/artistFeatures.json"; // Import the artist features data

const FeaturesArtist = () => {
  return (
    <>
    <div className="features-main">
      <div className="features-main-sec-1">
        <div className="features-main-sec-11">
          <h2>The leading standard in artist services.</h2>
          <h3>
            Empowering artists with top-tier tools and support to help their
            creativity thrive and reach new heights.
          </h3>
        </div>

        <div className="features-main-sec-12">
          {/* Pass the artistFeaturesData to FeatureCard */}
          <FeatureCard data={artistFeaturesData} />
        </div>
      </div>
    </div>
    </>
  );
};

export default FeaturesArtist;

