// Utility functions for handling JSON Web Tokens (JWT)
// This file provides functions to generate and verify JWTs using a secret key.
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "YOUR_SECRET_KEY";

// Generates a JWT for a given user
export const generateToken = (user) => {
  // Define expiration time based on role (admin gets 365 days, others 1 hour)
  const expiresIn = user.email === process.env.ADMIN_EMAIL ? "365d" : "1h";
  
  // Create the token
  const token = jwt.sign(
    { id: user._id, role: user.role },  // Payload containing user ID and role
    JWT_SECRET_KEY,                     // Secret key for signing the token
    { expiresIn }                       // Token expiration time
  );
  
  // Calculate expiration date in milliseconds (since JWT doesn't return expiration date)
  const expiresAt = Date.now() + (expiresIn === "365d" ? 365 * 24 * 60 * 60 * 1000 : 1 * 60 * 60 * 1000);
  
  return { token, expiresAt };
};

// Verifies a given JWT
export const verifyToken = (token) => {
  return jwt.verify(token, JWT_SECRET_KEY);
};


export default { generateToken, verifyToken };