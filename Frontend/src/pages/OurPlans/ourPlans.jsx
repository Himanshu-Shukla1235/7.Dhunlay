import React, { useState } from "react";
import "./ourPlans.css"; // Import the CSS file

import Card from "../../components/Cards/cardsC1";

const ourPlans = () => {
  return (
    <>
      <div className="ourPlans-main">
        <div className="ourPlans-main-sec-1">
          <h2>OurPlans</h2>
        </div>
        <div className="ourPlans-main-sec-2"></div>
        <div className="ourPlans-main-sec-3">
          <Card card_dot_bg="#FFFFFF" labelTC="#FFFFFF" title="Free" price="$0.00/month"></Card>{" "}
          <Card card_dot_bg="#00EEFF" labelTC="#00EEFF" title="Standered"></Card>
          <Card card_dot_bg="#FFD700" labelTC="#FFD700" title="Premium"></Card>
        </div>
      </div>
    </>
  );
};

export default ourPlans;
