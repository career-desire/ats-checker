import React from "react";
import "../css/Register.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Register({ setSuccess, setError }) {
  const navigate = useNavigate(); // Hook for navigation

  // Function to handle the signup form submission
  const handleSignup = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    // Collect form data
    const signUpForm = {
      name: e.target.name.value.trim(),
      email: e.target.email.value.toLowerCase().trim(),
      password: e.target.password.value,
      mobile: e.target.mobile.value,
    };

    try {
      // Send POST request to the server for registration
      const response = await fetch(`${process.env.REACT_APP_SERVER}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signUpForm),
      });

      // Parse the response data
      const data = await response.json();

      if (response.ok) {
        // If registration is successful
        setSuccess(data.message); // Set success message
        setError(null); // Clear any previous errors
        setTimeout(() => {
          navigate('/login'); // Redirect to login page after a short delay
        }, 1500);
      } else {
        // If registration fails
        setError(data.message || "An error occurred"); // Set the error message
      }
    } catch (error) {
      // Handle any errors that occur during fetch
      setError('Failed to connect to the server'); // Set a generic error message
    }
  };

  return (
    <div className="register-section">
      <h1>Register</h1>
      <form className="register-form" onSubmit={handleSignup}>
        <div>
          <label htmlFor="register-name">Name:</label>
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            required
          />
        </div>
        <div>
          <label htmlFor="register-email">Email:</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            required
          />
        </div>
        <div>
          <label htmlFor="register-password">Password:</label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            required
            minLength={8}
          />
        </div>
        <div>
          <label htmlFor="register-number">Mobile:</label>
          <input
            type="number"
            name="mobile"
            placeholder="Enter your mobile number"
            required
            minLength={7}
          />
        </div>
        <button type="submit" className="btn">
          Register
        </button>
      </form>
      <p>I already have an account</p>
      <Link to="/login">
        <button className="btn">
          Login
        </button>
      </Link>
    </div>
  );
}

export default Register;
