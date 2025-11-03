
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashboardPage from "./views/Dashboard/DashboardPage.jsx";
import LoginPage from "./views/Auth/LoginPage.jsx";
import SignupPage from "./views/Auth/SignupPage.jsx";   
import Header from "./views/Common/Header.jsx";
import "./styles/dashboard.css";
import "./styles/LoginPage.css";

function App() {
  const handleGetStarted = () => {
    window.location.href = "/login";
  };

  return (
    <Router>
      <Header />
      <Routes>
        <Route
          path="/"
          element={<DashboardPage onGetStarted={handleGetStarted} />}
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} /> {/* ✅ Added this */}
        {/* Optional future route */}
        {/* <Route path="/forgot-password" element={<ForgotPasswordPage />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
