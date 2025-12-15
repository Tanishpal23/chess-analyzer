
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { useAuth } from "../../context/AuthContext.jsx";
import { useChessStore } from "../../store/useChessStore.js";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const {playMode} = useChessStore();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      logout();
      navigate("/");
    }
  };

  const handlePlayOption = (mode) => {
    setIsDropdownOpen(false);

    useChessStore.getState().setPlayMode(mode);
    
    // Navigate to timer setup screen, passing mode (local, friend, computer)
    // navigate(`/play/timer?mode=${mode}`);

    navigate('/play/arena');
  };

  return (
    <header
      className="d-flex justify-content-center align-items-center py-3 bg-dark text-white shadow-sm w-100"
      style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000, height: "10dvh",}}
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
          {/* Home / Profile */}
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
            <button
                  className="dropdown-item rounded-3 py-2"
                  onClick={() => handlePlayOption("local")}
                >
                  Play
                </button>
          </li>
          {/* 🔽 Play Dropdown
          <li className="nav-item dropdown" role="presentation">
            <button
              className={`nav-link dropdown-toggle rounded-5${
                location.pathname.startsWith("/play") ? " active" : ""
              }`}
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded={isDropdownOpen}
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              Play
            </button>

            <ul
              className={`dropdown-menu text-center bg-light shadow-sm ${
                isDropdownOpen ? "show" : ""
              }`}
              style={{
                borderRadius: "1rem",
                marginTop: "6px",
                position: "absolute",
                zIndex: 2000,
              }}
            >
              <li>
                <button
                  className="dropdown-item rounded-3 py-2"
                  onClick={() => handlePlayOption("local")}
                >
                  Over the Board
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item rounded-3 py-2"
                  onClick={() => handlePlayOption("friend")}
                >
                  Play a Friend
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item rounded-3 py-2"
                  onClick={() => handlePlayOption("computer")}
                >
                  Play with Computer
                </button>
              </li>
            </ul>
          </li> */}

          {/* Analyze */}
          <li className="nav-item" role="presentation">
            <Link
              to="/analyze"
              className={`nav-link rounded-5${
                location.pathname === "/analyze" ? " active" : ""
              }`}
            >
              Analyze
            </Link>
          </li>

          {/* Auth buttons */}
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
                  location.pathname === "/login" || location.pathname === "/signup"
                    ? " active"
                    : ""
                }`}
              >
                {location.pathname === "/signup" ? "Login" : "Sign Up"}
              </Link>
            </li>
          )}

          {/* Contact */}
          <li className="nav-item" role="presentation">
            <Link
              to="/contact"
              className={`nav-link rounded-5${
                location.pathname === "/contact" ? " active" : ""
              }`}
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
