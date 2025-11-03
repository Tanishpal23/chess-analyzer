import React from "react";
import { useAuth } from "../../context/AuthContext.jsx";

const ProfilePage = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="text-center mt-5">
        <h2>Please log in to view your profile.</h2>
      </div>
    );
  }

  return (
    <div className="container mt-5 pt-5 text-center">
      <h2>Welcome, {user.name || "User"}!</h2>
      <p>Email: {user.email}</p>
    </div>
  );
};

export default ProfilePage;
