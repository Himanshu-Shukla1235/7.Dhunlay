import React from "react";
import "./featuresArtist.css";
import FeatureCard from "../../components/FeaturesCard/featureCard";
import artistFeaturesData from "../../data/artistFeatures.json"; // Import the artist features data
import UpcomingFeatureCard from "../../components/UpcomingFeatureCard/upcomingFeatureCard";
import upcomingArtistFeaturesData from "../../data/upcomingArtistFeatures.json"; // Import the artist features data
import Stacking from "../../components/stacking element/stacking";
import Footer_2 from "../../components/Footer/footerC2"

const FeaturesArtist = () => {
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

        <div className="division"></div>
        {/* using to divide the two sections */}

        <div className="features-main-sec-2">
          <h2>The upcoming features.</h2>
          <div className="features-main-sec-21">
            <UpcomingFeatureCard data={upcomingArtistFeaturesData} />
          </div>
        </div>

        <div className="features-main-sec-3">
          <Footer_2/>
        </div>
      </div>
    </>
  );
};

export default FeaturesArtist;
