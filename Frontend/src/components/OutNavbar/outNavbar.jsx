import "./outNavbar.css";
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import LanIcon from "@mui/icons-material/Lan";
import { Lan } from "@mui/icons-material";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import {Home, ReceiptIcon } from "lucide-react";
import SummarizeIcon from "@mui/icons-material/Summarize";
import RequestQuoteIcon from "@mui/icons-material/RequestQuote";


const outNavbar = () => {
  const navigate = useNavigate();
  const [navOpen, setNavOpen] = useState(false);
  const handleLinkClick = () => setNavOpen(false);

  const [serviceDropdownOpen, setserviceDropdownOpen] = useState(false);
  const serviceDropdownRef = useRef(null);

  const [featureDropdownOpen, setfeatureDropdownOpen] = useState(false);
  const featureDropdownRef = useRef(null);

  // useEffect to close searvices-dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        serviceDropdownRef.current &&
        !serviceDropdownRef.current.contains(event.target)
      ) {
        setserviceDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // useEffect to close features-dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        featureDropdownRef.current &&
        !featureDropdownRef.current.contains(event.target)
      ) {
        setfeatureDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="navibar">
      <h4 >
        {" "}
        <img
        
          src="/logo/logo1.png"
          alt="Logo"
          className="landing_page_logo"
        ></img>
        <span>Dhun</span>
        <span style={{ color: "white" }}>Lay</span>
      </h4>

      {/* Hamburger / Close icon */}
      <div className="hamburger-icon" onClick={() => setNavOpen(!navOpen)}>
        {navOpen ? (
          <CloseOutlinedIcon style={{ color: "white", fontSize: "28px" }} />
        ) : (
          <MenuOutlinedIcon style={{ color: "white", fontSize: "28px" }} />
        )}
      </div>

      <main className={`navbar-elems ${navOpen ? "show" : ""}`}>
        <ul className="all-elems">
          <li>
            <a href="/">
            Home
            </a>
          </li>
          <li className="service-button" ref={serviceDropdownRef}>
            <a
              className="button"
              onClick={() => setserviceDropdownOpen(!serviceDropdownOpen)}
            >
              Services <ArrowDropDownOutlinedIcon className="downicon" />
            </a>
            <div
              className={`dropdown-content ${serviceDropdownOpen ? "yes" : ""}`}
            >
              {" "}
              <a href="#">Music Distribution</a>
              <a href="#">Music Production</a>
              <a href="#">Mixing and Mastering</a>
              <a href="#">Promotion</a>
              <a href="#">Cover Art</a>
            </div>
          </li>
          <li className="feature-button" ref={featureDropdownRef}>
            <a
              className="button"
              onClick={() => setfeatureDropdownOpen(!featureDropdownOpen)}
            >
              Features <ArrowDropDownOutlinedIcon className="downicon" />
            </a>
            <div
              className={`dropdown-content ${featureDropdownOpen ? "yes" : ""}`}
            >
              <a href="./features_ArtistOut">Features for artists</a>
              <a href="./features_LabelOut">Features for labels</a>
            </div>
          </li>
          <li>
            <a href="/plans"> Pricing</a>
          </li>
          <li>
            <a href="/about">About</a>
          </li>
          <li>
            <a href="/contact">Contact</a>
          </li>
          {/* <li>
                    <a href="">FAQs</a>
                  </li> */}
          <li>
            <button
              className="loginbtnn"
              onClick={() => {
                navigate("/login");
                handleLinkClick();
              }}
            >
              Login
            </button>
          </li>
          <li>
            <button
              className="regbtn"
              onClick={() => {
                navigate("/register");
                handleLinkClick();
              }}
            >
              Register
            </button>
          </li>
        </ul>
      </main>
    </div>
  );
};

export default outNavbar;
