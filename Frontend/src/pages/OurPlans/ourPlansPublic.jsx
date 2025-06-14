import React, { useState } from "react";
import "./ourPlansPublic.css"; // Import the CSS file

import CardC3 from "../../components/Cards/cardsC3";
import CardC1 from "../../components/Cards/cardsC3";

const ourPlans = () => {
  return (
    <>
      <div className="ourPlansPublic-main">
        <div className="ourPlansPublic-main-sec-1">
          <h2>
            <span style={{ color: "gold" }}>Our</span>
            <span style={{ color: "white" }}>Plans</span>
          </h2>
        </div>
        {/* <div className="ourPlansPublic-main-sec-2">
          <div className="ourPlansPublic-main-sec-21">
            <p>Your Current Plan</p>
          </div>
          <div className="ourPlansPublic-main-sec-22">
            <p> Running Offers</p>
          </div>
        </div> */}
        <div className="ourPlansPublic-main-sec-3">
          <div className="ourPlansPublic-main-sec-31">
            <h2>Pricing For Artists</h2>
          </div>
          <div className="ourPlansPublic-main-sec-32">
            {" "}
            <CardC1
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
              tooltipContents={[
                "You receive 70% of all revenue from your music.",
                "Only one main artist is allowed per release.",
                "Your songs stay live on platforms forever.",
                "Get help or replies within 7 days.",
                "Release up to 3 songs to Spotify, Apple Music, etc.",
                "Track streams, revenue, and audience insights in one place.",
                "Releases go live within 7 days of submission.",
                "Make smart links to share with fans everywhere.",
                "We provide ISRC & UPC codes at no cost.",
              ]}
            />
            <CardC1
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
              tooltipContents={[
                "You keep 90% of all your music revenue.",
                "Set one main artist, with ability to add collaborators.",
                "Your songs remain live on all platforms forever.",
                "We reply to support queries within 3 business days.",
                "Send your music to Spotify, Apple Music, and more.",
                "View streaming, revenue, and fan data in one place.",
                "Pick the exact date and time for your release to go live.",
                "Generate smart links to promote your release anywhere.",
                "We provide required music codes (ISRC/UPC) for free.",
              ]}
            ></CardC1>
            <CardC1
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
              tooltipContents={[
                "You keep 90% of revenue earned from your music.",
                "Choose one main artist and add featured artists as needed.",
                "Your release stays live on platforms permanently.",
                "Customer support responds within 3 business days.",
                "Release full albums or EPs to Spotify, Apple Music, and more.",
                "Track streams, earnings, and listener data in one place.",
                "Set the exact date and time your music goes live.",
                "Share your release using smart, trackable links.",
                "We generate music codes (ISRC/UPC) for you at no cost.",
              ]}
            ></CardC1>
          </div>
        </div>
        <div className="ourPlansPublic-main-sec-3">
          <div className="ourPlansPublic-main-sec-31">
            <h2>Plans For Labels</h2>
          </div>
          <div className="ourPlansPublic-main-sec-32">
            {" "}
            <CardC1
              card_dot_bg="#FFFFFF"
              labelTC="#FFFFFF"
              title="Label Plan"
              price="₹ 2999"
              features={[
                "* Keep 93% of your earnings",
                "* Add Artist as many you want",
                "* Lifetime song availability",
                "* Support within 2 days",
                "* Distribute Unlimited tracks to all major DSPs",
                "* All-in-one analytics dashboard",
                "* Schedule exact release time",
                "* Create custom fan links",
                "* Free ISRC & UPC codes",
              ]}
              tooltipContents={[
                "Keep 93% of all your music revenue.",
                "Add unlimited artists to your release.",
                "Your tracks remain live on platforms forever.",
                "Get a support response within 2 days.",
                "Release unlimited songs to Spotify, Apple Music, and more.",
                "Monitor streams, fans, and earnings in one dashboard.",
                "Choose the exact date and time for your release.",
                "Promote using customizable, smart fan links.",
                "We provide ISRC & UPC codes at no extra cost.",
              ]}
            />
          </div>
        </div>
        {/* --------------------------------------------------- */}

        {/* <div className="ourPlansPublic-main-sec-3">
          <div className="ourPlansPublic-main-sec-31">
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
