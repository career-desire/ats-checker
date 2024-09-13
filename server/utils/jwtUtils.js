// Utility functions for handling JSON Web Tokens (JWT)
// This file provides functions to generate and verify JWTs using a secret key.

const jwt = require("jsonwebtoken");

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "YOUR_SECRET_KEY";

// Generates a JWT for a given user
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },  // Payload containing user ID and role
    JWT_SECRET_KEY,                     // Secret key for signing the token
    { expiresIn: "10d" }                // Token expiration time
  );
};

// Verifies a given JWT
const verifyToken = (token) => {
  return jwt.verify(token, JWT_SECRET_KEY);
};

module.exports = { generateToken, verifyToken };
