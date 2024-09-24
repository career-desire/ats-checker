const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
require("dotenv").config();

const authRoutes = require("./routes/auth"); //Endpoint for login and register
const fileRoutes = require("./routes/file"); //Endpoint for store resume for temporary
const resumeRoutes = require("./routes/resume"); //Endpoint for handle get and post resume report

const app = express();

// Connect to MongoDB
connectDB();

// Middleware to handle CORS and JSON parsing
app.use(cors({
  origin: process.env.CLIENT_URL,  // Allow only the client URL specified in the .env file
  methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Specify allowed methods
  allowedHeaders: ['Content-Type', 'Authorization']  // Specify allowed headers
}));

app.use(express.json());  // Parse incoming JSON requests

// Route handlers
app.use("/api", authRoutes);  // Authentication routes
app.use("/api", fileRoutes);  // File-related routes
app.use("/api", resumeRoutes);  // Resume-related routes

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
