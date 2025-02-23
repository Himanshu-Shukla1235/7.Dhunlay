import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./homePin.css"; // Import the CSS file
import Navbar from "../../components/Navbar/navbarC1";

const HomeP = () => {
  const [isNavVisible, setIsNavVisible] = useState(true); // Controls navbar visibility
  const [lastScrollY, setLastScrollY] = useState(0); // Tracks the last scroll position
  const navigate = useNavigate(); // React Router navigation

  // Scroll handler to manage navbar visibility
  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > lastScrollY && currentScrollY > 50) {
      // Scrolling down and past a threshold: Hide the navbar
      setIsNavVisible(false);
    } else {
      // Scrolling up: Show the navbar
      setIsNavVisible(true);
    }

    setLastScrollY(currentScrollY);
  }, [lastScrollY]);

  useEffect(() => {
    // Attach the scroll listener
    window.addEventListener("scroll", handleScroll);

    // Cleanup on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  return (
    <>
      <header
        className={`navbar ${isNavVisible ? "navbar-show" : "navbar-hide"}`}
      >
        <div className="logoD">
          {/* <div className="logo"></div> */}
          <h5>
            <span >Dhun</span>
            <span style={{ color: "white" }}>lay</span>
          </h5>
        </div>
        <Navbar />
        <div className="signIn">
          <button onClick={() => navigate("/Login")}>
            <h4>Login</h4>
          </button>
          <h4>/</h4>
          <button onClick={() => navigate("/Login")}>
            <h4>Register</h4>
          </button>
        </div>
      </header>

      <main className="content">
        <section className="Home-p-in-section-1">
          <div className="Home-p-in-section-11"></div>
        </section>
      </main>
      <footer></footer>
    </>
  );
};

export default HomeP;
