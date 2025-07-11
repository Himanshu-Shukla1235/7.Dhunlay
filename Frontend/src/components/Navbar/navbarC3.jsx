
import React, { useEffect, useState, useRef } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import "./navbarC3.css"
import Tooltip from "@mui/material/Tooltip";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import InfoIcon from "@mui/icons-material/Info";
import MessageIcon from "@mui/icons-material/Message";
import { Toc } from "@mui/icons-material";
import LeftDrawer from "../../components/drawer/drawerleftC1";
import CancelIcon from "@mui/icons-material/Cancel";
import ListComponent from "../../components/homePcomp/listItemsC1";
const NavbarC3 = () => {
     const navigate = useNavigate();
     const [open, setOpen] = React.useState(false);
       const backendAppUrl = import.meta.env.VITE_API_URL;
     const handleClick = () => {
    // Navigate to the desired URL when the icon is clicked
    window.location.href = "/about"; // Replace '/info' with your desired path
  };
   const toggleDrawer = () => {
    setOpen((prev) => !prev);
  };

  // function to signout

  const handleLogout = async () => {
    try {
      const res = await fetch(`${backendAppUrl}/api/logout`, {
        method: "GET", // or "POST" if your route is POST
        credentials: "include", // IMPORTANT: sends the cookie along
      });

      const data = await res.json();
      if (data.success) {
        navigate("/");
        // alert(data.message); // Logout successful.
        // Redirect or update UI here
      } else {
        alert("Logout failed.");
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };
  return (
    <>
      <header className="navbar">
        <div className="logoD">
          <div className="logo"></div>
          <h5>
            <span>Dhun</span>
            <span style={{ color: "white" }}>lay</span>
          </h5>
        </div>
        <div className="centerEl">
          <Tooltip title="Support">
            <span>
              <SupportAgentIcon
                className="icon1"
                sx={{
                  fontSize: {
                    xs: "1.5rem", // phones
                    sm: "1.2rem", // small tablets
                    md: "1.7vw", // desktops and up
                  },
                }}
              />
            </span>
          </Tooltip>
          <Tooltip title="About Us">
            <span onClick={handleClick}>
              <InfoIcon
                className="icon2"
                sx={{
                  fontSize: {
                    xs: "1.5rem", // phones
                    sm: "1.2rem", // small tablets
                    md: "1.7vw", // desktops and up
                  },
                }}
              />
            </span>
          </Tooltip>
          <Tooltip title="Messages ">
            {" "}
            <div
              className="home_in_P-message-Icon"
              style={{ cursor: "pointer" }}
            >
              {" "}
              <div className="home_in_P-message-Icon-alert"></div>
              <MessageIcon></MessageIcon>
            </div>
          </Tooltip>
        </div>
        <div className="signIn">
          <div className="drawerbutton">
            {" "}
            <button variant="outlined" color="neutral" onClick={toggleDrawer}>
              <Toc></Toc>
            </button>
          </div>
          <div className="drawerleft">
            <LeftDrawer open={open}>
              <button class="left-drawer-close-button" onclick={toggleDrawer}>
                <CancelIcon
                  className="close-button"
                  onClick={() => setOpen(false)}
                />
              </button>{" "}
              <ListComponent />
            </LeftDrawer>
          </div>
          <div className="Home-nav-signout">
            <button className="Home-nav-signout-button" onClick={handleLogout}>
              <h4>SignOut</h4>
            </button>
          </div>
        </div>
      </header>
    </>
  );
};



export default NavbarC3 ;