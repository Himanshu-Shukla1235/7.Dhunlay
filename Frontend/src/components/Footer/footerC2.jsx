import React from "react";
import "./footerC2.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faXTwitter,
  faLinkedin,
  faYoutube,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

const footerC2 = () => {
  return (
    <>
      <div className="footC2">
        <div className="foot-1C2">
          <div className="foot-1-1C2">
            <img src="/logo/logo2.png" alt="Logo" />
            <h2>
              Dhun<sapn style={{ color: "white" }}>lay</sapn>
            </h2>
          </div>
          <p>
            <span>©</span>2025 Dhunlay, All rights reserved.
          </p>
        </div>
        <div className="outer">
          <div className="foot-2C2 servicesC2">
            <h3>Services</h3>
            <div className="foot-2-1C2">
              <p>Music Production</p>
              <p>Mixing and Mastering</p>
              <p>Promotion</p>
              <p>Cover Art</p>
            </div>
          </div>
          <div className="foot-2C2">
            <h3>Company</h3>
            <div className="foot-2-1C2">
              <a href="/policy">policy / Terms and Conditions</a>
            </div>
          </div>
        </div>
        <div className="foot-3C2">
          <div className="foot-3-1C2">
            <h3>Get In Touch.</h3>
            <div className="socialsC2">
            
              <a
                href="https://www.linkedin.com/company/dhunlay/"
                className="icon-linkedinC2"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faLinkedin} />
              </a>
              <a
                href="https://youtube.com/@dhunlayofficial?si=mEtFGMK57ZCppRQG"
                className="icon-youtubeC2"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faYoutube} />
              </a>
              <a
                href="https://twitter.com"
                className="icon-twitterC2"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faXTwitter} />
              </a>
              <a
                href="https://www.instagram.com/dhunlay?igsh=YXNoY2NhYTFneWdj"
                className="icon-instagramC2"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faInstagram} />
              </a>
            </div>
          </div>
          <div className="foot-3-2C2">
            <h3>For Latest Information.</h3>
            <form className="subscribe-formC2">
              <input type="email" placeholder="Enter your email" required />
              <button type="submit">Subscribe</button>
            </form>
            {/* <button type="submit">Subscribe</button> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default footerC2;
