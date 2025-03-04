import React from "react";
import { useNavigate, Outlet } from "react-router-dom";
import "./home_in_P.css"; 
import ListComponent from "../../components/homePcomp/listItemsC1";
import { useUser } from "../User/UserData"; 
import PersonIcon from '@mui/icons-material/Person';
import Balancing from "../../components/Elements/balancing element/balancing";

const HomeP = () => {
  const navigate = useNavigate();
  const { userData } = useUser(); 

  return (
    <>
      <header className="navbar ">
        <div className="logoD">
          <div className="logo"></div>
          <h5>
            <span>Dhun</span>
            <span style={{ color: "white" }}>lay</span>
          </h5>
        </div>
        <div className="centerEl">
        {/* <div className="earnings"><p>Earnings : <span style={{color:"white"}}>0$</span></p></div> */}
      
        {/* <div className="upcomingFeat"><p>TotalUploads: <span style={{color:"white"}}>0</span></p></div>
        <div className="upcomingFeat"><p>TotalUploads: <span style={{color:"white"}}>0</span></p></div> */}
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
            <div className="Home-p-section-113"></div>
          </div>
        </section>

        {/* Page Content will be rendered here */}
        <section className="Home-p-section-2">
        <div className="Home-p-section-21"><Outlet /></div>
          
        </section>
      </main>
      
      <footer></footer>
    </>
  );
};

export default HomeP;
