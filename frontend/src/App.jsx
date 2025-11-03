
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashboardPage from "./views/Dashboard/DashboardPage.jsx";
import LoginPage from "./views/Auth/LoginPage.jsx";
import SignupPage from "./views/Auth/SignupPage.jsx";
import ProfilePage from "./views/Profile/ProfilePage.jsx";
import Header from "./views/Common/Header.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import "./styles/dashboard.css";
import "./styles/LoginPage.css";

function App() {
  const handleGetStarted = () => {
    window.location.href = "/login";
  };

  return (
    <AuthProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<DashboardPage onGetStarted={handleGetStarted} />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
