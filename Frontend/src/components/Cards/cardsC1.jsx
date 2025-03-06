import React from "react";
import "./cardsC1.css"; // Import the CSS file

const Card = ({
  title = "Premium",
  price = "$9.99/month",
  description = "Get access to exclusive features.",
  features = ["Feature 1", "Feature 2", "Feature 3"],
  buttonText = "Subscribe Now",
  labelTC = "",
  cardBg = "#000000",
  card_dot_bg = "rgb(255, 255, 255)",
}) => {
  return (
    <div className="cardsC1-card_box" style={{ background: cardBg }}>
      <div
        className="cardsC1-card_circle"
        style={{ background: card_dot_bg }}
      ></div>
      <div
        className="cardsC1-label"
        
      >
        <h4 style={{ color: labelTC }}>{title}</h4>
      </div>
      <div className="cardsC1-card_content">
        <h2 className="cardsC1-card_price">{price}</h2>
        <p className="cardsC1-card_description">{description}</p>

        <ul className="cardsC1-card_features">
          {features.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>

        <button className="cardsC1-subscribe_btn">
          <h4>{buttonText}</h4>
        </button>
      </div>
    </div>
  );
};

export default Card;
