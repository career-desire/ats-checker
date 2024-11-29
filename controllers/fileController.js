import fs from "fs";
import pdfParse from "pdf-parse";
import mammoth from "mammoth";
import textract from "textract";

const extractText = async (filePath, fileType) => {
  let extractedText = "";

  try {
    switch (fileType) {
      case ".pdf":
        const dataBuffer = fs.readFileSync(filePath);
        const data = await pdfParse(dataBuffer);
        extractedText = data.text;
        break;
      case ".docx":
        const result = await mammoth.extractRawText({ path: filePath });
        extractedText = result.value;
        break;
      case ".doc":
      case ".txt":
        extractedText = await new Promise((resolve, reject) => {
          textract.fromFileWithPath(filePath, (error, text) => {
            if (error) reject(error);
            resolve(text);
          });
        });
        break;
      default:
        throw new Error("Unsupported file type.");
    }
    return extractedText.trim();
  } catch (error) {
    throw new Error(`Error extracting text: ${error.message}`);
  } finally {
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error("Error deleting file:", err.message || err);
      } else {
        console.log(`File ${filePath} deleted successfully.`);
      }
    });
  }
};

export default extractText;