import React, { useEffect, useState, useRef } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import "./home_in_P.css";
import ListComponent from "../../components/homePcomp/listItemsC1";
import { useUser } from "../User/UserData";
import PersonIcon from "@mui/icons-material/Person";
import StarIcon from "@mui/icons-material/Star";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import InfoIcon from "@mui/icons-material/Info";
import Tooltip from "@mui/material/Tooltip";
import Drawer from "@mui/joy/Drawer";
import TocIcon from "@mui/icons-material/Toc";
import { Toc } from "@mui/icons-material";

import LeftDrawer from "../../components/drawer/drawerleftC1";
import CancelIcon from "@mui/icons-material/Cancel";

const HomeP = () => {
  const navigate = useNavigate();
  const { userData } = useUser();
  const [open, setOpen] = React.useState(false);
  // Redirect to /dashboard if at root "/"
  useEffect(() => {
    if (window.location.pathname === "/") {
      navigate("/dashboard");
    }
  }, [navigate]);

  // If userData is not available, show a loading message
  if (!userData) {
    return <div className="loading">Loading...</div>;
  }

  const toggleDrawer = () => {
    setOpen((prev) => !prev);
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
            <span>
              <InfoIcon className="icon2" sx={{
                  fontSize: {
                    xs: "1.5rem", // phones
                    sm: "1.2rem", // small tablets
                    md: "1.7vw", // desktops and up
                  },
                }} />
            </span>
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
            <button onClick={() => navigate("/Login")}>
              <h4>SignOut</h4>
            </button>
          </div>
        </div>
      </header>

      {/* //!_____________________________________________| MAIN |_________________________________________*/}

      <main className="Home-p-main">
        <section className="Home-p-section-1">
          <div className="Home-p-section-11">
            <div className="Home-p-section-111">
              <p className="Home-p-section-111-userName">
                <PersonIcon /> {userData.username}
              </p>
            </div>
            <div className="Home-p-section-112">
              <ListComponent />
            </div>
            <div className="Home-p-section-113">
              <div className="Home-p-section-1131">
                <a href="/ourPlans">
                  {" "}
                  <StarIcon sx={{ fontSize: 15 }} className="star-icon" />
                  OurPlans
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Page Content will be rendered here */}
        <section className="Home-p-section-2">
          <div className="Home-p-section-21">
            <Outlet />
          </div>
        </section>
      </main>

      <footer></footer>
    </>
  );
};

export default HomeP;
