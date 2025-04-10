import React from "react";
import "./loadingC2.css";
const LoadingC2 = () => {
  return (
    <>
      <div className="loadingC2-body">
        <div class="loadingC2">
          <div class="loadingC2-face">
            <div class="loadingC2-circle"></div>
          </div>
          <div class="loadingC2-face">
            <div class="loadingC2-circle">
              {" "}
              <span
                style={{ fontFamily: "sans-serif", fontSize: "5em" }}
              ></span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoadingC2;
