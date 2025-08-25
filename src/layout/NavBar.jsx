import React, { useContext, useEffect, useRef, useState } from "react";
import cdLogo from "../assets/logo/CD_Logo.svg";
import { Link } from "react-router-dom";
import "../style/NavBar.css";
import "../style/ThemeSwitchBtn.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faRightFromBracket, faSun, faUser } from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../context/AuthContext.jsx";
import { ThemeContext } from "../context/ThemeContext.jsx";
import Warning from "./Warning.jsx";

function NavBar() {
  const { logout, user, credit } = useContext(AuthContext);
  const { isDark, setIsDark } = useContext(ThemeContext);
  const [handleLogout, setHandleLogout] = useState(false);
  const [islogout, setIsLogout] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef(null);

  useEffect(() => {
    if (islogout) {
      logout()
      setHandleLogout(false)
      setIsLogout(false)
    }
  }, [islogout])

  //Handle blur
  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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

  const handleCache = () => {
    localStorage.removeItem("resume");
    localStorage.removeItem("resumeReport");
  };

  return (
    <nav
      className="nav-bar"
      id={isDark === "true" ? "dark-nav" : "light-theme"}
    >
      <Link to="/">
        <img src={cdLogo} alt="Career desire logo" className="logo-img" />
      </Link>
      <div className="nav-options">
        <div className="btn-container">
          <label className="switch">
            <input
              type="checkbox"
              checked={isDark === "false"}
              onChange={handleDarkMode}
            />
            <span className="slider">
              <div className="star star_1"></div>
              <div className="star star_2"></div>
              <div className="star star_3"></div>
              <svg viewBox="0 0 16 16" className="cloud_1 cloud">
                <path
                  transform="matrix(.77976 0 0 .78395-299.99-418.63)"
                  fill="#fff"
                  d="m391.84 540.91c-.421-.329-.949-.524-1.523-.524-1.351 0-2.451 1.084-2.485 2.435-1.395.526-2.388 1.88-2.388 3.466 0 1.874 1.385 3.423 3.182 3.667v.034h12.73v-.006c1.775-.104 3.182-1.584 3.182-3.395 0-1.747-1.309-3.186-2.994-3.379.007-.106.011-.214.011-.322 0-2.707-2.271-4.901-5.072-4.901-2.073 0-3.856 1.202-4.643 2.925"
                />
              </svg>
            </span>
          </label>
          {/* <button
            className="btn"
            onClick={handleCache}
            title="If you don't get results, then clear cache."
          >
            Clear cache
          </button> */}
          {!user && <Link to="/login"><button className="auth-btn">Login</button></Link>}
          {user && (
            <div ref={profileRef} className="profile-container" id={isProfileOpen ? "profile-open" : "profile-close"}>
              <div className="profile-icon" onClick={() => setIsProfileOpen(!isProfileOpen)}>
                <FontAwesomeIcon icon={faUser} />
              </div>
              <div className="profile-options">
                <Link to="https://dashboard.careerdesire.in" target="_blank"><p>Dashboard</p></Link>
                <div className="logout-container" onClick={() => setHandleLogout(true)}>
                  <p>Logout</p>
                  <FontAwesomeIcon icon={faRightFromBracket} />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {handleLogout && (
        <Warning
          warnText="Are you sure you want to log out?"
          actionTextOne="Yes"
          cancelText="No"
          actionOne={() => setIsLogout(true)}
          noAction={() => setHandleLogout(false)}
        />
      )}
    </nav>
  );
}

export default NavBar;
