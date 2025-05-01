// Route definitions for handling resume report operations
// This file sets up routes related to resume reports. 
// The routes are protected by the `protectRoute` middleware, which ensures that 
// only authenticated users can access them.
import express from "express";
import getAllResumeReports from "../controllers/resumeController.js";

const router = express.Router();

// GET route to retrieve all resume reports
router.get("/resume-reports", getAllResumeReports);

export default router;
