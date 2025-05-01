import React from "react";
import { Link } from "react-router-dom";

function Login({ handleLogin }) {

  return (
    <div className="register-section">
      <h1>Login</h1>
      <form className="register-form" onSubmit={handleLogin}>
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
            minLength={8}
            required
          />
        </div>
        <button type="submit" className="btn">
          Login
        </button>
      </form>
      <p>I don't have an account</p>
      <Link to="/register">
        <button type="button" className="btn">
          Register
        </button>
      </Link>
    </div>
  );
}

export default Login;
