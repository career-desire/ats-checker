import React, { useEffect, useState } from "react";
import cdLogo from "../assets/career_desire_logo.jpg";
import { Link } from "react-router-dom";
import "../css/NavBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";

function NavBar({ handleSuccess, isDark, setIsDark }) {
  const [token, setToken] = useState(localStorage.getItem("token"));

  // Logout function and it will clear all cache data
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("description");
    localStorage.removeItem("expiresAt");
    localStorage.removeItem("resume");
    localStorage.removeItem("resumePath");
    localStorage.removeItem("resumeReport");
    localStorage.removeItem("userId");
    localStorage.removeItem("dark");
    setToken(null);
    handleSuccess("Logout successfully");
  };

  // Change theme function
  const handleDarkMode = () => {
    const nextTheme = isDark === "true" ? "false" : "true";
    setIsDark(nextTheme);
    localStorage.setItem("dark", nextTheme);
  };

  // Check cache theme
  useEffect(() => {
    const savedTheme = localStorage.getItem("dark");
    if (savedTheme) {
      setIsDark(savedTheme);
    } else {
      localStorage.setItem("dark", "false");
      setIsDark("false");
    }
  }, [setIsDark]);

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);

  const handleCache = () => {
    localStorage.removeItem("resume");
    localStorage.removeItem("resumeReport");
  };

  return (
    <nav
      className="nav animate__animated animate__fadeInDown"
      id={isDark === "true" ? "dark-nav" : "light-theme"}
    >
      <Link to="/">
        <div className="cd-logo">
          <img src={cdLogo} alt="career desire logo" className="cd-logo-img" />
          <h4>Career Desire</h4>
        </div>
      </Link>
      <section className="nav-btns">
        {isDark === "true" ? (
          <FontAwesomeIcon icon={faSun} onClick={handleDarkMode} />
        ) : (
          <FontAwesomeIcon icon={faMoon} onClick={handleDarkMode} />
        )}
        <button
          className="btn"
          onClick={handleCache}
          title="If you don't get results, then clear cache."
        >
          Clear cache
        </button>
        {!token ? (
          <Link to="/login">
            <button className="btn">Login</button>
          </Link>
        ) : (
          <Link to="/login" onClick={handleLogout}>
            <button className="btn">Logout</button>
          </Link>
        )}
      </section>
    </nav>
  );
}

export default NavBar;
