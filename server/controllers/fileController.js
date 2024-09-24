const path = require("path");
const fs = require("fs");
const multer = require("multer");
const pdfParse = require("pdf-parse");
const mammoth = require("mammoth");
const textract = require("textract");

// Define the directory for uploaded files
const uploadsDir = path.join(__dirname, "uploads");

// Create the uploads directory if it does not exist
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// Configure multer to save uploaded files to the uploads directory
const upload = multer({ dest: uploadsDir });

// Function to extract text from various file types
const extractText = async (filePath, fileType) => {
  let extractedText = "";

  console.log(`Received file: ${filePath}, type: ${fileType}`);

  try {
    // Handle different file types
    switch (fileType) {
      case ".pdf":
        // Extract text from PDF files
        const dataBuffer = fs.readFileSync(filePath);
        const data = await pdfParse(dataBuffer);
        extractedText = data.text;
        break;

      case ".docx":
        // Extract text from DOCX files
        const result = await mammoth.extractRawText({ path: filePath });
        extractedText = result.value;
        break;

      case ".doc":
      case ".txt":
        // Extract text from DOC and TXT files
        extractedText = await new Promise((resolve, reject) => {
          textract.fromFileWithPath(filePath, (error, text) => {
            if (error) return reject(error);
            resolve(text);
          });
        });
        break;

      default:
        // Throw an error for unsupported file types
        throw new Error("Unsupported file type.");
    }

    // Return the extracted text
    return extractedText;
  } catch (error) {
    // Log the error and rethrow it
<<<<<<< HEAD
    throw "Error extracting text:", error.message || error;
=======
    console.error("Error extracting text:", error.message || error);
    throw error;
>>>>>>> e6a75a2e2d3d167d5524804ee0236afa96df6502
  } finally {
    // Delete the file after processing
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error("Error deleting file:", err.message || err);
      } else {
        console.log(`File ${filePath} deleted successfully.`);
      }
    });
  }
};

// Export the multer configuration and text extraction function
module.exports = { upload, extractText };
