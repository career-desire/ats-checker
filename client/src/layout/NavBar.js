import React, { useEffect, useState } from 'react';
import cdLogo from '../assets/career_desire_logo.jpg';
import { Link } from 'react-router-dom';
import '../css/NavBar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';

function NavBar({ handleSuccess, isDark, setIsDark }) {
  const [token, setToken] = useState(localStorage.getItem('token'));

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('description');
    localStorage.removeItem('expiresAt');
    localStorage.removeItem('resume');
    localStorage.removeItem('resumePath');
    localStorage.removeItem('resumeReport');
    localStorage.removeItem('userId');
    localStorage.removeItem('dark');
    setToken(null);
    handleSuccess("Logout successfully");
  };

  const handleDarkMode = () => {
    const nextTheme = isDark === "true" ? "false" : "true";
    setIsDark(nextTheme);
    localStorage.setItem("dark", nextTheme);
  };

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
    setToken(localStorage.getItem('token'));
  }, []);

  return (
    <nav className='nav animate__animated animate__fadeInDown' id={isDark === "true" ? "dark-nav" : "light-theme" }>
      <Link to='/'>
        <div className='cd-logo'>
          <img src={cdLogo} alt="career desire logo" className='cd-logo-img' />
          <h4>Career Desire</h4>
        </div>
      </Link>
      <section className='nav-btns'>
        {isDark === "true" ? (
          <FontAwesomeIcon icon={faSun} onClick={handleDarkMode} />
        ) : (
          <FontAwesomeIcon icon={faMoon} onClick={handleDarkMode} />
        )}
        {!token ? (
          <Link to='/login'><button className="btn">Login</button></Link>
        ) : (
          <Link to='/login' onClick={handleLogout}><button className="btn">Logout</button></Link>
        )}
      </section>
    </nav>
  );
}

export default NavBar;