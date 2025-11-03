import React from "react";
import chessHeroImg from "../../assets/dashboardimg.png";
import "../../styles/dashboard.css";

const DashboardPage = ({ onGetStarted }) => {
  return (
    <div className="dashboard-fullscreen">
      {/* Left: image */}
      <div className="dashboard-left">
        <img
          src={chessHeroImg}
          alt="Chess dashboard"
          className="dashboard-hero-img"
        />
      </div>

      {/* Right: content */}
      <div className="dashboard-right">
        <div className="dashboard-content">
          <h1 className="dashboard-title">
            Play chess.<br />
            Improve your game.<br />
            Have fun!
          </h1>
          <p className="dashboard-subtext">
            Analyze your matches, explore strategies, and master your games with our in-depth tools.
          </p>
          <button className="get-started-btn" onClick={onGetStarted}>
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
