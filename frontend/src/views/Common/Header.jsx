import React from "react";
import { Link, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Header = () => {
  const location = useLocation();

  return (
    <header
      className="d-flex justify-content-center align-items-center py-3 bg-dark text-white shadow-sm w-100"
      style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000 }}
    >
      <div
        className="d-flex align-items-center gap-3 w-100 px-4"
        style={{ maxWidth: "1200px" }}
      >
        {/* Nav Pills */}
        <ul
          className="nav nav-pills nav-fill gap-2 p-1 small bg-primary rounded-5 shadow-sm flex-grow-1"
          id="pillNav2"
          role="tablist"
          style={{
            "--bs-nav-link-color": "var(--bs-white)",
            "--bs-nav-pills-link-active-color": "var(--bs-primary)",
            "--bs-nav-pills-link-active-bg": "var(--bs-white)",
          }}
        >
          <li className="nav-item" role="presentation">
            <Link
              to="/"
              className={`nav-link rounded-5${
                location.pathname === "/" ? " active" : ""
              }`}
            >
              Home
            </Link>
          </li>
          <li className="nav-item" role="presentation">
            <Link
              to="/profile"
              className={`nav-link rounded-5${
                location.pathname === "/profile" ? " active" : ""
              }`}
            >
              Profile
            </Link>
          </li>
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
          <li className="nav-item" role="presentation">
            <Link
              to="/play"
              className={`nav-link rounded-5${
                location.pathname === "/play" ? " active" : ""
              }`}
            >
              Play
            </Link>
          </li>
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
          <li className="nav-item" role="presentation">
            <Link
              to={location.pathname === "/signup" ? "/login" : "/signup"}
              className={`nav-link rounded-5${
                location.pathname === "/login" ||
                location.pathname === "/signup"
                  ? " active"
                  : ""
              }`}
            >
              {location.pathname === "/signup" ? "Login" : "Sign Up"}{" "}
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
