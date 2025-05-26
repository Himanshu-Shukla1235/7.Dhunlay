import React, { useState } from "react";
import "./ourPlansPublic.css"; // Import the CSS file

import CardC3 from "../../components/Cards/cardsC3";

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
        {/* <div className="ourPlans-main-sec-2">
          <div className="ourPlans-main-sec-21">
            <p>Your Current Plan</p>
          </div>
          <div className="ourPlans-main-sec-22">
            <p> Running Offers</p>
          </div>
        </div> */}
        <div className="ourPlans-main-sec-3">
          <div className="ourPlans-main-sec-31">
            <h2>Pricing For Artists</h2>
          </div>
          <div className="ourPlans-main-sec-32">
            {" "}
            <CardC3
              card_dot_bg="#FFFFFF"
              labelTC="#FFFFFF"
              title="Freemium"
              price="₹0"
              features={[
                "* Keep 70% of your earnings",
                "* One primary artist per release",
                "* Lifetime song availability",
                "* Support within 7 days",
                "* Distribute up to 3 tracks to all major DSPs",
                "* All-in-one analytics dashboard",
                "* 7-day release processing time",
                "* Create custom fan links",
                "* Free ISRC & UPC codes",
              ]}
            />
            <CardC3
              card_dot_bg="#00EEFF"
              labelTC="#00EEFF"
              title="Per Release"
              price="₹399 / Per Release"
              features={[
                "* Keep 90% of your earnings",
                "* One fixed primary artist, with option to add more",
                "* Lifetime song availability",
                "* Support within 3 business days",
                "* Distribute Your track to all major DSPs",
                "* All-in-one analytics dashboard",
                "* Schedule exact release time",
                "* Create custom fan links",

                "* Free ISRC & UPC codes",
              ]}
            ></CardC3>
            <CardC3
              card_dot_bg="#FFD700"
              labelTC="#FFD700"
              title="EP / Album"
              price="₹999 / Per Release"
              features={[
                "* Keep 90% of your earnings",
                "* One fixed primary artist, with option to add more",
                "* Lifetime song availability",
                "* Support within 3 business days",
                "* Distribute Your Album / Ep to all major DSPs",
                "* All-in-one analytics dashboard",
                "* Schedule exact release time",
                "* Create custom fan links",

                "* Free ISRC & UPC codes",
              ]}
            ></CardC3>
          </div>
        </div>
        {/* --------------------------------------------------- */}

        {/* <div className="ourPlans-main-sec-3">
          <div className="ourPlans-main-sec-31">
            <h2>Subscriptions For Labels</h2>
          </div>
          <div className="c">
            {" "}
            <Card
              card_dot_bg="#FFFFFF"
              labelTC="#FFFFFF"
              title="Label Plan"
              price="$35.21"
              features={[
                "* Keep 70% of your earnings",
                "* One primary artist per release",
                "* Lifetime song availability",
                "* Support within 7 days",
                "* Distribute up to 3 tracks to all major DSPs",
                "* All-in-one analytics dashboard",
                "* 7-day release processing time",
                "* Create custom fan links",
                "* Free ISRC & UPC codes",
              ]}
            />
            <Card
              card_dot_bg="#00EEFF"
              labelTC="#00EEFF"
              title="Per Release"
              price="$4.68 / Per Release"
              features={[
                "* Keep 90% of your earnings",
                "* One fixed primary artist, with option to add more",
                "* Lifetime song availability",
                "* Support within 3 business days",
                "* Distribute Your track to all major DSPs",
                "* All-in-one analytics dashboard",
                "* Schedule exact release time",
                "* Create custom fan links",

                "* Free ISRC & UPC codes",
              ]}
            ></Card>
           
          </div>
        </div> */}
      </div>
    </>
  );
};

export default ourPlans;
