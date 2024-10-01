import jwt from 'jsonwebtoken';
import ResumeDetails from "../models/resumeDetails.js"; // Import ResumeDetails schema

const getAllResumeReports = async (req, res) => {
  try {
    // Extract the token from the Authorization header
    const token = req.headers.authorization?.split(" ")[1]; // Correctly extract token

    if (!token) {
      return res.status(401).json({ error: "No token provided" }); // Handle missing token
    }

    let decodeToken;

    // Verify and decode the JWT token
    try {
      decodeToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    } catch (error) {
      return res.status(403).json({ error: "Invalid or expired token" }); // Handle invalid token
    }

    let reports;

    if (decodeToken.email === process.env.ADMIN_EMAIL) {
      // If the user is an admin (by email), fetch all resume reports
      reports = await ResumeDetails.find();
    } else {
      // If the user is not an admin, fetch only their own reports
      const userId = decodeToken.id; // Get the user ID from the token
      reports = await ResumeDetails.find({ userId }); // Fetch reports matching this user ID
    }

    // Respond with the fetched reports
    res.status(200).json(reports);
  } catch (error) {
    // Log and respond with an error message in case of failure
    console.error("Error fetching resume reports:", error.message || error);
    res.status(500).json({ error: "Failed to fetch resume reports" });
  }
};

// Export the controller function
export default getAllResumeReports;
