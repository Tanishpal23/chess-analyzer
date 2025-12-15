import React from "react";
import { Routes, Route } from "react-router-dom";
import DashboardPage from "./views/Dashboard/DashboardPage.jsx";
import LoginPage from "./views/Auth/LoginPage.jsx";
import SignupPage from "./views/Auth/SignupPage.jsx";
import ProfilePage from "./views/Profile/ProfilePage.jsx";
import TimerSetupPage from "./views/Play1/TimerSetupPage.jsx";
import Header from "./views/Common/Header.jsx";
import ArenaPage from "./views/Play1/ArenaPage.jsx";

import Analyze from "./views/Analyze/Analyze.jsx";
import "./views/Analyze/Analyze.css";
import "./styles/dashboard.css";
import "./styles/LoginPage.css";
import "../src/views/Play1/ArenaPage.css"
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";


function App() {
  const handleGetStarted = () => {
    window.location.href = "/login";
  };

  return (
    <>
      <Header />
      <div style={{ marginTop: "10dvh" }}>
      <Routes >
        <Route
          path="/"
          element={<DashboardPage onGetStarted={handleGetStarted} />}
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/play/timer" element={<TimerSetupPage />} />

        <Route path="/play/arena" element={<ArenaPage />} />
        <Route path="/analyze" element={<Analyze />}/>
        {/* ✅ */}
      </Routes>
      </div>
    </>
  );
}

export default App;
