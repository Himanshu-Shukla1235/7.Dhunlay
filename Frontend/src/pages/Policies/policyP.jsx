import React from "react";
import "./policyP.css";

const TermsViewer = () => {
  return (
    <div className="terms-container">
      <h2 className="terms-title">Terms and Conditions</h2>
      <div className="pdf-wrapper">
        <iframe
          src="/Policy/terms.pdf#toolbar=0"
          title="Terms and Conditions PDF"
          width="100%"
          height="100%"
          frameBorder="0"
        />
      </div>
    </div>
  );
};

export default TermsViewer;
