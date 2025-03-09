import React, { useState } from "react";
import "./ourPlans.css"; // Import the CSS file

import Card from "../../components/Cards/cardsC1";

const ourPlans = () => {
  return (
    <>
      <div className="ourPlans-main">
        <div className="ourPlans-main-sec-1">
          <h2>
            <span style={{ color: "gold" }}>Our</span>
            <span style={{ color: "white" }}>Plans</span>
          </h2>
        </div>
        <div className="ourPlans-main-sec-2">
          <div className="ourPlans-main-sec-21">
            <p>Your Current Plan</p>
          </div>
          <div className="ourPlans-main-sec-22">
            <p> Running Offers</p>
          </div>
        </div>
        <div className="ourPlans-main-sec-3">
          <div className="ourPlans-main-sec-31">
            <h2>Subscriptions</h2>
          </div>
          <div className="ourPlans-main-sec-32">
            {" "}
            <Card
              card_dot_bg="#FFFFFF"
              labelTC="#FFFFFF"
              title="Free"
              price="$0.00/month"
            ></Card>{" "}
            <Card
              card_dot_bg="#00EEFF"
              labelTC="#00EEFF"
              title="Standered"
            ></Card>
            <Card
              card_dot_bg="#FFD700"
              labelTC="#FFD700"
              title="Premium"
            ></Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default ourPlans;
