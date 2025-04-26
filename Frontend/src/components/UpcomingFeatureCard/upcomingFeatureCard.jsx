import React from "react";
import "./upcomingFeatureCard.css";

const UpcomingFeatureCard = ({ data }) => {
  return (
    <div className="feature-cards-container">
      {data.features.map((feature, idx) => (
        <div className="card2" key={idx}>
          {/* <img src={feature.imageUrl} alt={feature.title} className="card-image2" /> */}
          <div className="content2">
            <h2>{feature.title}</h2> 
            <p>{feature.content}</p> 
          </div>
          {/* <button>See More 😘</button> */}
        </div>
      ))}
    </div>
  );
};

export default UpcomingFeatureCard;