import { GoogleGenerativeAI } from "@google/generative-ai";
import ResumeDetails from "../models/resumeDetails.js";
import dotenv from "dotenv";

dotenv.config();

const saveResumeReport = async (text, userId) => {
  try {
    const newResume = new ResumeDetails({ text, userId });
    await newResume.save();
    return { success: true };
  } catch (error) {
    console.error("Error saving resume report:", error.message || error);
    return { success: false, error: "Failed to save resume report" };
  }
};

// Function to generate prompt for Generative AI
const generatePrompt = (resumeText, jobDescription) => {
  return `I have a job description and a resume. Please analyze the resume to determine how well it matches the job description. Provide a detailed JSON response with the following structure "don't use array to store":
    
    {
      "checkList": {
        "name": "Name",
        "jobRole": "Job Title/Position",
        "number": "Mobile number",
        "email": "Email address",
        "linkedIn": "LinkedIn profile hyperlink",
        "location": "Location",
        "portfolio": "Personal website or portfolio",
        "summary": "Profile summary or objective",
        "awardsAndRecognition": "Awards",
        "education": "Degree",
        "projects": "title",
        "certifications": "title",
        "languagesKnown": "Language 1, Language 2"
      },
      "matchingDetails": {
        "keywordsMissing": "keywords mentioned in the job description but missing from the resume (e.g., frontend, problem-solving)",
        "skillsMissing": "key skills mentioned in the job description but missing from the resume (e.g., html, css)",
        "experienceMissing": "key experiences mentioned in the job description but missing from the resume (e.g., frontend, webdevelopment)",
        "educationMissing": "Details of educational qualifications required by the job description but missing from the resume (e.g., bca)",
        "overallScore": "A score out of 100 indicating how well the resume matches the job description not only in round numbers",
        "readability": "Readability grade of the resume (e.g., Excellent, Good, Fair, Poor)",
        "actionVerbsUsed": "Count of action verbs used in the resume",
        "estimatedReadingTime": "Estimated reading time of the resume"
      },
      "summary": "A brief summary explaining the overall match between the resume and the job description",
      "suggestions": "Suggestions for improvement"
    }
    
    Here is the job description:
  
    ${jobDescription}
  
    And here is the resume:
  
    ${resumeText};`;
};

export const processGenerativeAI = async (extractedText, description, userId) => {
  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      generationConfig: { responseMimeType: "application/json" },
    });

    const prompt = generatePrompt(extractedText, description);
    const result = await model.generateContent(prompt);

    const candidates = result.response.candidates;
    if (candidates.length > 0) {
      const responseText = candidates[0].content.parts[0].text;
      const jsonResponse = JSON.parse(responseText)
      const saveResult = await saveResumeReport(responseText, userId);
      if (saveResult.success) {
        return jsonResponse;
      } else {
        return { error: saveResult.error };
      }
    } else {
      return { error: "No content available in the response." };
    }
  } catch (error) {
    console.error("Generative AI Error:", error);
    return { error: "An error occurred with Generative AI." };
  }
};

export default processGenerativeAI;