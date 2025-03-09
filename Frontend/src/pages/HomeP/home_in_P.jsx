import React from "react";
import { useNavigate, Outlet } from "react-router-dom";
import "./home_in_P.css";
import ListComponent from "../../components/homePcomp/listItemsC1";
import { useUser } from "../User/UserData";
import PersonIcon from "@mui/icons-material/Person";
import StarIcon from "@mui/icons-material/Star";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import InfoIcon from "@mui/icons-material/Info";
import Tooltip from "@mui/material/Tooltip";
const HomeP = () => {
  const navigate = useNavigate();
  const { userData } = useUser();

  // If userData is not available, show a loading message
  if (!userData) {
    return <div className="loading">Loading...</div>;
  }

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
          <SupportAgentIcon className="icon1" />
        </span>
      </Tooltip>
      <Tooltip title="About Us">
        <span>
          <InfoIcon className="icon2" />
        </span>
      </Tooltip>
    </div>
        <div className="signIn">
          <button onClick={() => navigate("/Login")}>
            <h4>SignOut</h4>
          </button>
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
