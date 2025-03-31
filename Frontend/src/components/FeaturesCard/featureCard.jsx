import React from "react";
import "./featureCard.css";

const FeatureCard = ({ data }) => {
  return (
    <div className="feature-cards-container">
      {data.features.map((feature, idx) => (
        <div className="card" key={idx}>
          <div className="content">
            <h2>{feature.title}</h2> 
            <p>{feature.content}</p> 
          </div>
          <button>See More 😘</button>
        </div>
      ))}
    </div>
  );
};

export default FeatureCard;

