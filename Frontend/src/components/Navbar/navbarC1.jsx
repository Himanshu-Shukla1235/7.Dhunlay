
import React, { useState, useEffect } from "react";
import "./navbarC1.css"; // Import the CSS file for the Navbar
import "./navbarC1List.css";
const Navbar = ({ isVisible }) => {


  const [width, setWidth] = useState(window.innerWidth);


  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
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
