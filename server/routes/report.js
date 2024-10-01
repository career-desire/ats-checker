import path from "path";
import multer from "multer";
import express from "express";
import fs from "fs";
import extractText from "../controllers/fileController.js";
import processGenerativeAI from "../controllers/aiController.js";
import { fileURLToPath } from "url";

// Get __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

const uploadsDir = path.join(__dirname, "../uploads");

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

const upload = multer({
  dest: uploadsDir,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (![".pdf", ".docx", ".doc", ".txt"].includes(ext)) {
      return cb(new Error("Unsupported file type."));
    }
    cb(null, true);
  },
});

// Route to process resume report
router.post("/resume-report", upload.single("file"), async (req, res) => {
  try {
    const filePath = req.file.path;
    const fileType = path.extname(req.file.originalname).toLowerCase();

    const extractedText = await extractText(filePath, fileType);

    const { description, userId } = req.body;

    const report = await processGenerativeAI(
      extractedText,
      description,
      userId
    );

    if (report.error) {
      // console.log(report.error)
      return res.status(500).json({ error: report.error });
    }

    res.status(200).json({ report, extractedText });
  } catch (error) {
    console.error("Error during resume processing:", error);
    res.status(500).json({ error: "Error generating resume report" });
  }
});

export default router;
