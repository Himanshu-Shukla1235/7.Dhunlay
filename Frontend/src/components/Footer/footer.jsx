import React from "react";
import "./footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faXTwitter,
  faLinkedin,
  faYoutube,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

const footer = () => {
  return (
    <>
      <div className="foot">
        <div className="foot-1">
          <div className="foot-1-1">
            <img src="/logo/logo2.png" alt="Logo" />
            <h2>
              Dhun<span style={{ color: "white" }}>lay</span>
            </h2>
          </div>
          <p>
            <span>©</span>2025 Dhunlay, All rights reserved.
          </p>
        </div>
        <div className="outer">
          <div className="foot-2 services">
            <h3>Services</h3>
            <div className="foot-2-1">
              <a href="#">Music Production</a>
              <a href="#">Mixing and Mastering</a>
              <a href="#">Promotion</a>
              <a href="#">Cover Art</a>
            </div>
          </div>
          <div className="foot-2">
            <h3>Company</h3>
            <div className="foot-2-1">
              <a href="#">policy-1</a>
              <a href="#">policy-1</a>
              <a href="#">terms & conditions-1</a>
            </div>
          </div>
        </div>
        <div className="foot-3">
          <div className="foot-3-1">
            <h3>Get In Touch.</h3>
            <div className="socials">
              <a
                href="https://github.com"
                className="icon-github"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faGithub} />
              </a>
              <a
                href="https://linkedin.com"
                className="icon-linkedin"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faLinkedin} />
              </a>
              <a
                href="https://youtube.com"
                className="icon-youtube"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faYoutube} />
              </a>
              <a
                href="https://twitter.com"
                className="icon-twitter"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faXTwitter} />
              </a>
              <a
                href="https://instagram.com"
                className="icon-instagram"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faInstagram} />
              </a>
            </div>
          </div>
          <div className="foot-3-2">
            <h3>For Latest Information.</h3>
            <form className="subscribe-form">
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

export default footer;
