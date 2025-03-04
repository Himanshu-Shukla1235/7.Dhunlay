import React, { useState } from "react";
import "./dashBoard.css"; // Import the CSS file
import Balancing from "../../components/Elements/balancing element/balancing";
import Steping from "../../components/steping element/steping";
import HoverCircle from "../../components/Elements/balancing element/animatedCircle";

const Dashboard = () => {
  const [hovered, setHovered] = useState(false);
  const [hovered2, setHovered2] = useState(false);

  return (
    <div className="dashBoard-main">
      {/* Section 1 */}
      <div className="dashBoard-main-sec-1">
        <div className="dashBoard-main-sec-11">
          <div className="dashBoard-main-sec-11-steping">
            <Steping />
          </div>
          <h2>Dashboard</h2>
        </div>
      </div>

      {/* Section 2 */}
      <div className="dashBoard-main-sec-2">
        <div
          className="dashBoard-main-sec-21"
          onMouseEnter={() => {
            setHovered(true);
          }}
          onMouseLeave={() => {
            setHovered(false);
          }}
        >
          <div className="dashBoard-main-sec-211">
            <div
              className={`dashBoard-main-sec-211-dot ${
                hovered ? "active" : ""
              }`}
            ></div>
            <div className="dashBoard-main-sec-211-earning"> <p>Earning</p></div>
          </div>
        </div>
        <div
          className="dashBoard-main-sec-22"
          onMouseEnter={() => {
            setHovered2(true);
          }}
          onMouseLeave={() => {
            setHovered2(false);
          }}
        >
          <div className="dashBoard-main-sec-221">
            <div
              className={`dashBoard-main-sec-221-dot ${
                hovered2 ? "active" : ""
              }`}
            ></div>
              <div className="dashBoard-main-sec-221-ToUploads"> <p>Total Uploads</p></div>
          </div>
        </div>
      </div>

      {/* Section 3 */}
      <div className="dashBoard-main-sec-3">
        <div className="dashBoard-main-sec-31"></div>
        <div className="dashBoard-main-sec-32"></div>
      </div>
    </div>
  );
};

export default Dashboard;
