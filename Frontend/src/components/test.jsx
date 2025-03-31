// import React, { useState } from "react";
// import Selector from "./selectors/selectC1";
// import { Typography, Container, Box } from "@mui/material";
// import FileUploaderC1 from "./fileUploaded/fileUploaderC1";
// const SelectorTestPage = () => {

//   return (
//     <><FileUploaderC1></FileUploaderC1></>
//   );
// };

// export default SelectorTestPage;

// eslint-disable-next-line no-unused-vars
import React from "react";
import "./styles.css";
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';
// import Navbar from "./Navbar/navbarC2";

const test = () => {
  return (
    <>
      <div className="test-main">
        <div className="navibar">
          <h4>
            <span>Dhun</span>
            <span style={{ color: "white" }}>lay</span>
          </h4>
          <main className="navbar-elems">
            <ul className="all-elems">
              {/* <li className="dropdown">
                <a className="dropbtn">Features</a>
                <div className="dropdown-content">
                  <a href="./features_artist">Features for artists</a>
                  <a href="./features_label">Features for labels</a>
                  <a href="#">Feature 3</a>
                </div>
              </li> */}
              <li className="paste-button">
                <a className="button">Features <ArrowDropDownOutlinedIcon className="downicon"/></a>
                <div className="dropdown-content">
                  <a href="./features_artist">Features for artists</a>
                  <a href="./features_label">Features for labels</a>
                  <a href="#">Feature 3</a>
                </div>
              </li>
              <li>
                <a href="#">Subscriptoin</a>
              </li>
              <li>
                <a href="#">Contact</a>
              </li>
              <li>
                <a href="/contact">FAQ{"'"}s</a>
              </li>
              <li>
                <button className="loginbtnn">Login</button>
              </li>
              <li>
                <button className="regbtn">Register</button>
              </li>
            </ul>
          </main>
        </div>
      </div>
    </>
  );
};

export default test;
