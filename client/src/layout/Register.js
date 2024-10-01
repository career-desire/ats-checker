import React, { useState } from "react";
import "../css/Auth.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { handleRegisterApiCall } from "../utilities/api/handleRegister"

function Register({ handleSuccess, setError }) {
  const navigate = useNavigate(); 
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mobile, setMobile] = useState('');

  const handleSignup = (e)=>{
    e.preventDefault(); 
  
    const signUpForm = {
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password: password,
      mobile: mobile,
    };
    handleRegisterApiCall(signUpForm, handleSuccess, setError, navigate)
  }

  return (
    <div className="auth-section">
      <h1>Register</h1>
      <form className="auth-form" onSubmit={handleSignup}>
        <div>
          <label htmlFor="register-name">Name:</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            required
          />
        </div>
        <div>
          <label htmlFor="register-email">Email:</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>
        <div>
          <label htmlFor="register-password">Password:</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
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