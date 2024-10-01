// Import necessary modules and components
import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import RoutesComponent from "./routes/RoutesComponent";
import { handleLoginApiCall } from './utilities/api/handleLogin';
import "./css/Animation.css"

// Main component for the app
function App() {
  // Hook for navigation
  const navigate = useNavigate();

  // State variables
  const [loading, setLoading] = useState(false); // Indicates if data is being processed
  const [success, setSuccess] = useState(false); // Success message to show
  const [error, setError] = useState(false); // Error message to show
  const [isDark, setIsDark] = useState('true'); // For handle dark theme
  const [LoaderReport, setLoaderReport] = useState('');

  // Retrieves JWT token from session storage
  const token = localStorage.getItem("token");

  // Function to handle error messages
  const handleError = useCallback((message) => {
    // Set error message and hide loading after 3 seconds
    setError(message);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  // Function to handle success messages
  const handleSuccess = useCallback((message) => {
    // Set success message and hide loading after 3 seconds
    setSuccess(message);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  // Function to handle login form submission
  const handleLogin = async (e) => {
    // Prevent the default form submission behavior
    e.preventDefault();
    // Call login API
    handleLoginApiCall(e, handleSuccess, handleError, navigate)
  };

  // Function to handle token expiry
  const checkTokenExpiry = useCallback(() => {
    // Get token expiry time from local storage
    const expiresAt = localStorage.getItem('expiresAt');
    // Check if token has expired
    if (expiresAt && new Date().getTime() > parseInt(expiresAt)) {
      // Remove token and expiry time from local storage
      localStorage.removeItem('token');
      localStorage.removeItem('expiresAt');
      // Set error message and redirect to login page
      setError("Your session has expired. Please log in again.");
      navigate('/login');
    }
  }, [navigate]);

  // Effect to check token expiry on mount
  useEffect(() => {
    checkTokenExpiry();
  }, [checkTokenExpiry]);

  // Effect to handle success/error messages and decode token
  useEffect(() => {
    // Clear success/error messages and hide loading after 3 seconds
    if (success || error) {
      const timeout = setTimeout(() => {
        setSuccess(false);
        setError(false);
        setLoading(false);
      }, 3000);
      return () => clearTimeout(timeout);
    }

    // Decode JWT token if available
    if (token) {
      const decodeToken = jwtDecode(token);
      localStorage.setItem("userId", decodeToken.id)
    }
  }, [success, error, token]);

  // Effect to handle dark theme
  useEffect(() => {
    // Get the body element
    const body = document.getElementsByTagName("body")[0];
    // Set dark theme if enabled
    if (isDark === "true") {
      body.setAttribute("id", "dark-body");
    } else {
      body.removeAttribute("id");
    }
  }, [isDark]);

  return (
    <div className="App">
      <RoutesComponent 
        isDark={isDark}
        setIsDark={setIsDark}
        success={success}
        error={error}
        setError={setError}
        handleError={handleError}
        handleSuccess={handleSuccess}
        token={token}
        loading={loading}
        setLoading={setLoading}
        handleLogin={handleLogin}
        LoaderReport={LoaderReport}
        setLoaderReport={setLoaderReport}
      />
    </div>
  );
}

export default App;