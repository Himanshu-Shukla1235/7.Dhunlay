import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ReferencePageC1.css'; // Import the CSS file

const ReferencePageC1 = ({ title, content, backPath = '/' }) => {
  const navigate = useNavigate();

  return (
    <div className="reference-container">
      <div className="reference-card">
        <h1 className="reference-title">{title}</h1>
        <div className="reference-content">
          {content}
        </div>
        <div className="reference-actions">
          <button onClick={() => navigate(backPath)} className="back-button">
            ⬅ Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReferencePageC1;
