// Route for handling file uploads and text extraction

const path = require("path");
const express = require("express");
const { upload, extractText } = require("../controllers/fileController");

const router = express.Router();

router.post("/upload", upload.single("file"), async (req, res) => {
  try {
<<<<<<< HEAD
=======
    // Check if a file was uploaded
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded." });
    }

>>>>>>> e6a75a2e2d3d167d5524804ee0236afa96df6502
    // Get the path and type of the uploaded file
    const filePath = req.file.path;
    const fileType = path.extname(req.file.originalname).toLowerCase();

    // Validate the file type
    if (![".pdf", ".docx", ".doc", ".txt"].includes(fileType)) {
      return res.status(400).json({ error: "Unsupported file type." });
    }

    // Extract text from the file
    const extractedText = await extractText(filePath, fileType);
<<<<<<< HEAD
    res.json({ text: extractedText.trim() });
  } catch (error) {
    // Handle errors during file processing
    console.error("Error during file processing:", error);
    return res.status(500).json({ error: "Error extracting text", details: error.message });
=======
    res.json({ text: extractedText });
  } catch (error) {
    // Handle errors during file processing
    console.error("Error during file processing:", error);
    res.status(500).json({ error: "Error extracting text", details: error.message });
>>>>>>> e6a75a2e2d3d167d5524804ee0236afa96df6502
  }
});

module.exports = router;
