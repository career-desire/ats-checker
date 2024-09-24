const ResumeDetails = require("../models/resumeDetails");

// Controller function to save a resume report
const saveResumeReport = async (req, res) => {
  try {
    // Extract text and userId from request body
    const { text, userId } = req.body;

    // Check if text is provided
    if (!text) {
      return res.status(400).json({ error: "Text is required" });
    }

    // Create a new ResumeDetails instance with the provided data
    const newResume = new ResumeDetails({ text, userId });

    // Save the new resume report to the database
    await newResume.save();

    // Respond with success message
    res.status(200).json({ message: "Resume report saved successfully" });
  } catch (error) {
    // Log and respond with error message in case of failure
    console.error("Error saving resume report:", error.message || error);
    res.status(500).json({ error: "Failed to save resume report" });
  }
};

// Controller function to get all resume reports
const getAllResumeReports = async (req, res) => {
  try {
    // Fetch all resume reports from the database
    const reports = await ResumeDetails.find();

    // Respond with the fetched reports
    res.status(200).json(reports);
  } catch (error) {
    // Log and respond with error message in case of failure
    console.error("Error fetching resume reports:", error.message || error);
    res.status(500).json({ error: "Failed to fetch resume reports" });
  }
};

// Export the controller functions
module.exports = { saveResumeReport, getAllResumeReports };
