import React from "react";
import { Link } from "react-router-dom";
import "../css/Auth.css"

function Login({ handleLogin }) {

  return (
    <div className="auth-section">
      <h1>Login</h1>
      <form className="auth-form" onSubmit={handleLogin}>
        <div>
          <label htmlFor="login-email">Email:</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            required
            autoComplete="email"
          />
        </div>
        <div>
          <label htmlFor="login-password">Password:</label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            minLength={8}
            required
            autoComplete="current-password"
          />
        </div>
        <button type="submit" className="btn">
          Login
        </button>
      </form>
      <p>Don't have an account? <Link to="/register"><p>Register</p></Link></p>
    </div>
  );
}

export default Login;