// Route definitions for handling resume report operations
// This file sets up routes related to resume reports. 
// The routes are protected by the `protectRoute` middleware, which ensures that 
// only authenticated users can access them.

const express = require("express");
const { saveResumeReport, getAllResumeReports } = require("../controllers/resumeController");
const protectRoute = require("../middleware/authMiddleware");

const router = express.Router();

// POST route to save a new resume report
router.post("/resume-report", protectRoute, saveResumeReport);

// GET route to retrieve all resume reports
router.get("/resume-reports", protectRoute, getAllResumeReports);

module.exports = router;
