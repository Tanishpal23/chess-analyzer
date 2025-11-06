import React from "react";
import { Routes, Route } from "react-router-dom";
import DashboardPage from "./views/Dashboard/DashboardPage.jsx";
import LoginPage from "./views/Auth/LoginPage.jsx";
import SignupPage from "./views/Auth/SignupPage.jsx";
import ProfilePage from "./views/Profile/ProfilePage.jsx";
import TimerSetupPage from "./views/Play/TimerSetupPage.jsx";
import Header from "./views/Common/Header.jsx";
import ArenaPage from "./views/Play/ArenaPage.jsx";
import "./styles/dashboard.css";
import "./styles/LoginPage.css";
import "./styles/ArenaPage.css"
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";


function App() {
  const handleGetStarted = () => {
    window.location.href = "/login";
  };

  return (
    <>
      <Header />
      <Routes>
        <Route
          path="/"
          element={<DashboardPage onGetStarted={handleGetStarted} />}
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/play/timer" element={<TimerSetupPage />} />

        <Route path="/play/arena" element={<ArenaPage />} />
        {/* ✅ */}
      </Routes>
    </>
  );
}

export default App;
