
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { useAuth } from "../../context/AuthContext.jsx";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      logout();
      navigate("/");
    }
  };

  return (
    <header
      className="d-flex justify-content-center align-items-center py-3 bg-dark text-white shadow-sm w-100"
      style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000 }}
    >
      <div className="d-flex align-items-center gap-3 w-100 px-4" style={{ maxWidth: "1200px" }}>
        <ul
          className="nav nav-pills nav-fill gap-2 p-1 small bg-primary rounded-5 shadow-sm flex-grow-1"
          role="tablist"
          style={{
            "--bs-nav-link-color": "var(--bs-white)",
            "--bs-nav-pills-link-active-color": "var(--bs-primary)",
            "--bs-nav-pills-link-active-bg": "var(--bs-white)",
          }}
        >
          {/* Home -> Profile */}
          <li className="nav-item" role="presentation">
            <Link
              to={user ? "/profile" : "/"}
              className={`nav-link rounded-5${
                location.pathname === (user ? "/profile" : "/") ? " active" : ""
              }`}
            >
              {user ? "Profile" : "Home"}
            </Link>
          </li>

          <li className="nav-item" role="presentation">
            <Link
              to="/play"
              className={`nav-link rounded-5${location.pathname === "/play" ? " active" : ""}`}
            >
              Play
            </Link>
          </li>

          <li className="nav-item" role="presentation">
            <Link
              to="/analyze"
              className={`nav-link rounded-5${location.pathname === "/analyze" ? " active" : ""}`}
            >
              Analyze
            </Link>
          </li>

          {user ? (
            <li className="nav-item" role="presentation">
              <button className="nav-link rounded-5" onClick={handleLogout}>
                Logout
              </button>
            </li>
          ) : (
            <li className="nav-item" role="presentation">
              <Link
                to={location.pathname === "/signup" ? "/login" : "/signup"}
                className={`nav-link rounded-5${
                  location.pathname === "/login" || location.pathname === "/signup" ? " active" : ""
                }`}
              >
                {location.pathname === "/signup" ? "Login" : "Sign Up"}
              </Link>
            </li>
          )}

          <li className="nav-item" role="presentation">
            <Link
              to="/contact"
              className={`nav-link rounded-5${location.pathname === "/contact" ? " active" : ""}`}
            >
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
