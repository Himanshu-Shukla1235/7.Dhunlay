import React from 'react';
import './Board.css';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <h1 className="heading">admin dashboard</h1>
      <div className="navbar">navbar</div>
      <div className="cards">
        <div className="card">number of users</div>
        <div className="card">total earning</div>
        <div className="card">platform analytics</div>
      </div>
    </div>
  );
};

export default Dashboard;
