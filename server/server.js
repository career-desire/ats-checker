import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import dotenv from "dotenv";

dotenv.config();

import authRoutes from "./routes/auth.js";
import resumeRoutes from "./routes/resume.js";
import reportRoutes from "./routes/report.js";

const app = express();

// Connect to MongoDB
connectDB();

// Middleware to handle CORS and JSON parsing
app.use(
  cors({
    origin: process.env.CLIENT_URL, // Allow only the client URL specified in the .env file
    methods: ["GET", "POST", "PUT", "DELETE"], // Specify allowed methods
    allowedHeaders: ["Content-Type", "Authorization"], // Specify allowed headers
  })
);

app.use(express.json()); // Parse incoming JSON requests

// Route handlers
app.use("/api", authRoutes); 
app.use("/api", resumeRoutes); 
app.use("/api", reportRoutes); 

// Start the server
const PORT = process.env.PORT || 5000;
const HOST = '192.168.0.182';

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
  console.log(`Server running at http://${HOST}:${PORT}/`);
});