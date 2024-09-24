const bcrypt = require("bcrypt");//For encrypt password
const User = require("../models/user");//User schema
const { generateToken } = require("../utils/jwtUtils");
require("dotenv").config();

const register = async (req, res) => {
  //Getting request from client for register
  const { name, email, password, mobile } = req.body;

  try {
    // Check if the email or mobile number already exists
    const existingEmail = await User.findOne({ email });
    const existingMobile = await User.findOne({ mobile });

    if (existingEmail) {
      return res.status(400).json({ message: "Email address already in use" });
    }

    if (existingMobile) {
      return res.status(400).json({ message: "Mobile number already in use" });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({ name, email, password: hashedPassword, mobile });

    // Assign role based on environment variable
    newUser.role = email === process.env.ADMIN_EMAIL ? "admin" : "user";

    //Save new user on database 
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });

  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const login = async (req, res) => {
  //Getting request from client for login
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid email address" });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Generate JWT token
    const token = generateToken(user);
    res.status(200).json({ token, message: "Login successful" });

  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { register, login };
