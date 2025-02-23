import React from "react";
import "./navbarC1.css"; // Import the CSS file for the Navbar

const Navbar = ({ isVisible }) => {
  return (
    <main className="navbar-C1">
      <ul class="navbar-C1-Opt">
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
          <a href="/contact">Pricing</a>
        </li>
        <li>
          <a href="/contact">Contact Support</a>
        </li>
        <li>
          <a href="/contact">Me</a>
        </li>
      </ul>
    </main>
  );
};

export default Navbar;
