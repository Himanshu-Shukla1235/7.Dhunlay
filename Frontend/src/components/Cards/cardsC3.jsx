import React from "react";
import { useNavigate } from "react-router-dom";
import "./cardsC3.css"; // Import the CSS file
import InfoIcon from "@mui/icons-material/Info";
import Tooltip from "@mui/material/Tooltip";

const Card = ({
  title = "Premium",
  price = "$9.99/month",
  description = "Get access to exclusive features.",
  features = ["Feature 1", "Feature 2", "Feature 3"],
  buttonText = "Subscribe Now",
  labelTC = "",
  cardBg = "#000000",
  card_dot_bg = "rgb(255, 255, 255)",
  tooltipContents = [],
  navigation = "",
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/${navigation}`); // Replace with your desired path
  };
  return (
    <div className=" cardsC3-card_box" style={{ background: cardBg }}>
      <div
        className=" cardsC3-card_circle"
        style={{ background: card_dot_bg }}
      ></div>
      <div className=" cardsC3-label">
        <h4 style={{ color: labelTC }}>{title}</h4>
      </div>
      <div className=" cardsC3-card_content">
        <h2 className=" cardsC3-card_price">{price}</h2>
        <p className=" cardsC3-card_description">{description}</p>

        <ul className=" cardsC3-card_features">
          {features.map((feature, index) => (
            <li key={index}>
              {feature}{" "}
              <Tooltip title={tooltipContents[index] || "info"}>
                <span>
                  <InfoIcon
                    className=" cardsC3-icon2"
                    sx={{
                      fontSize: {
                        xs: "0.5rem",
                        sm: "0.7rem",
                        md: "1.2vw",
                      },
                      opacity: "0.5",
                    }}
                  />
                </span>
              </Tooltip>
            </li>
          ))}
        </ul>

        {/* <button className=" cardsC3-subscribe_btn" onClick={handleClick}>
          <h4>{buttonText}</h4>
        </button> */}
      </div>
    </div>
  );
};

export default Card;
