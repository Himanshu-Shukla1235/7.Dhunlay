
// this navbar is for when you are in login page or in logout home page 


import React from "react";
import "./navbarC2.css"; // Import the CSS file for the Navbar

const Navbar = ({ isVisible }) => {
  return (
    <main className="navbar-C2">
      <ul class="navbar-C2-Opt">
        <li>
          <a href="/home">Home</a>
        </li>
        <li>
          <a href="/about">Features</a>
        </li>
        <li>
          <a href="/contact">Services</a>
        </li>
        <li>
          <a href="/contact"  >Pricing</a>
        </li>
      </ul>
    </main>
  );
};

export default Navbar;
