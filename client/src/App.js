import React, { useEffect, useState, useCallback } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Route, Routes, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Uploader from "./components/Uploader";
import Report from "./components/Report";
import Loader from "./components/Loader";
import Register from "./components/Register";
import Login from "./components/Login";
import Alert from "@mui/material/Alert";
import NavBar from "./components/NavBar";

// Main component for the app
function App() {
  // API key for Google Generative AI, fetched from environment variables
  const API_KEY = process.env.REACT_APP_GEMINI_API_KEY;
  const navigate = useNavigate(); // Hook for navigation

  // State variables
  const [description, setDescription] = useState(""); // Holds the job description
  const [loading, setLoading] = useState(false); // Indicates if data is being processed
  const [success, setSuccess] = useState(false); // Success message to show
  const [error, setError] = useState(false); // Error message to show
  const [userId, setUserId] = useState(); // Stores the user's ID
  const [useRecentFile, setUseRecentFile] = useState(false); // Flag for using recent file
  const [useRecentDescription, setUseRecentDescription] = useState(false); // Flag for using recent description

  const token = localStorage.getItem("token"); // Retrieves JWT token from session storage

  // Function to handle error messages
  const handleError = useCallback((message) => {
    setError(message);
    setTimeout(() => {
      setLoading(false); // Hide loading after 3 seconds
    }, 3000);
  }, []);

  // Function to handle success messages
  const handleSuccess = useCallback((message) => {
    setSuccess(message);
    setTimeout(() => {
      setLoading(false); // Hide loading after 3 seconds
    }, 3000);
  }, []);

  // Function to process Generative AI
  const processGenerativeAI = useCallback(
    async (text) => {
      try {
        const genAI = new GoogleGenerativeAI(API_KEY); // Initialize Generative AI with API key
        const model = genAI.getGenerativeModel({
          model: "gemini-1.5-flash",
          generationConfig: { responseMimeType: "application/json" },
        });

        // Fetch cached resume and description from localStorage
        const cachedResume = localStorage.getItem("resume");
        const cachedDescription = localStorage.getItem("description");

        // If the text or description has changed, generate new content
        if (text !== cachedResume || description !== cachedDescription) {
          const prompt = generatePrompt(text, description); // Generate prompt for Generative AI
          localStorage.setItem("resume", text);
          localStorage.setItem("description", description);
          setDescription(""); // Clear description after setting it in localStorage
          const result = await model.generateContent(prompt); // Generate content using AI
          const candidates = result.response.candidates;
          if (candidates.length > 0) {
            const responseText = candidates[0].content.parts[0].text;
            localStorage.setItem("report", responseText); // Store generated report in localStorage

            const saveResult = await saveToDatabase(responseText, userId); // Save report to database
            if (saveResult) {
              setTimeout(() => {
                navigate("/report"); // Navigate to report page
                handleSuccess("Resume report generated successfully.");
              }, 4000);
            } else {
              handleError("Failed to save resume to database.");
            }
          } else {
            handleError("No content available in the response.");
          }
        } else {
          setTimeout(() => {
            navigate("/report"); // Navigate to report page if no changes
            handleSuccess("Resume report generated successfully.");
          }, 4000);
          setDescription(""); // Clear description
        }
      } catch (error) {
        console.error("Generative AI Error:", error);
        handleError("An error occurred with Generative AI.");
      }
    },
    [description, API_KEY, handleSuccess, handleError, navigate]
  );

  // Function to handle form submission
  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault(); // Prevent default form submission

      const formData = new FormData(e.target); // Create FormData object from form submission

      setLoading(true); // Show loading
      navigate("/loader"); // Navigate to loader page

      if (useRecentFile) {
        try {
          const resumeText = localStorage.getItem("resume");
          await processGenerativeAI(resumeText); // Process Generative AI with recent file
        } catch (error) {
          handleError("Error processing recent data.");
        }
      } else {
        try {
          const response = await fetch(
            `${process.env.REACT_APP_SERVER}/upload`,
            {
              method: "POST",
              body: formData,
            }
          );

          if (response.ok) {
            const result = await response.json();
            await processGenerativeAI(result.text); // Process Generative AI with new file
          } else {
            handleError("Failed to extract text.");
          }
        } catch (error) {
          handleError("Error during file upload.");
        }
      }
    },
    [
      description,
      useRecentFile,
      useRecentDescription,
      processGenerativeAI,
      handleError,
      navigate,
    ]
  );

  // Function to save generated report to the database
  const saveToDatabase = async (responseText, userId) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER}/resume-report`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ text: responseText, userId }),
        }
      );

      return response.ok; // Return true if save was successful
    } catch (error) {
      console.error("Error saving to database:", error);
      return false; // Return false if save failed
    }
  };

  // Function to generate prompt for Generative AI
  const generatePrompt = (resumeText, jobDescription) => {
    return `I have a job description and a resume. Please analyze the resume to determine how well it matches the job description. Provide a detailed JSON response with the following structure:
    
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
        "keywordsMatched": "keywords from the resume that match the job description (e.g., frontend, problem-solving)",
        "keywordsMissing": "keywords mentioned in the job description but missing from the resume (e.g., frontend, problem-solving)",
        "skillsMatched": "skills from the resume that match the job description (e.g., html, css)",
        "skillsMissing": "key skills mentioned in the job description but missing from the resume (e.g., html, css)",
        "experienceMatched": "relevant experiences from the resume that match the job description requirements (e.g., frontend, webdevelopment)",
        "experienceMissing": "key experiences mentioned in the job description but missing from the resume (e.g., frontend, webdevelopment)",
        "educationMatched": "Details of educational qualifications from the resume that match the job description (e.g., bca)",
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

  // Function to handle login form submission
  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    // Collect form data
    const logInForm = {
      email: e.target.email.value.toLowerCase().trim(),
      password: e.target.password.value,
    };

    try {
      // Send POST request to the server
      const response = await fetch(`${process.env.REACT_APP_SERVER}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(logInForm),
      });

      // Parse the response data
      const data = await response.json();

      if (response.ok) {
        // If login is successful
        setSuccess(data.message); // Set success message
        setError(null); // Clear any previous errors
        localStorage.setItem("token", data.token); // Store the token in session storage
        const expiresAt = new Date().getTime() + 10 * 24 * 60 * 60 * 1000; // 10 days in milliseconds
        localStorage.setItem("expiresAt", expiresAt);
        navigate('/'); // Redirect to the home page
      } else {
        // If login fails
        setError(data.message || "An error occurred"); // Set the error message
      }
    } catch (error) {
      // Handle any errors that occur during fetch
      setError("Failed to connect to the server"); // Set a generic error message
    }
  };

  useEffect(()=>{
    const checkTokenExpiry = () => {
      const expiresAt = localStorage.getItem('expiresAt');
    
      // If expiry time exists, check if it's expired
      if (expiresAt && new Date().getTime() > expiresAt) {
        // Token has expired, remove it from localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('expiresAt');
        setError("Your session has expired. Please log in again.");
        navigate('/login'); // Redirect to login page
      }
    };
    
    // Call this function whenever your app loads or the user navigates
    checkTokenExpiry();    
  })

  // Effect to handle success/error messages and decode token
  useEffect(() => {
    if (success || error) {
      const timeout = setTimeout(() => {
        setSuccess(false); // Clear success message
        setError(false); // Clear error message
        setLoading(false); // Hide loading spinner
      }, 3000);
      return () => clearTimeout(timeout);
    }

    if (token) {
      const decodeToken = jwtDecode(token); // Decode JWT token
      setUserId(decodeToken.id); // Set user ID from token
    }
  }, [success, error, token]);

  return (
    <div className="App">
      {success && (
        <Alert
          variant="filled"
          severity="success"
          className="alert-box"
          id="bounce-in-top"
        >
          {success} {/* Display success message */}
        </Alert>
      )}
      {error && (
        <Alert
          variant="filled"
          severity="error"
          className="alert-box"
          id="bounce-in-top"
        >
          {error} {/* Display error message */}
        </Alert>
      )}
      <NavBar /> {/* Navigation bar component */}
      <Routes>
        {/* Define routes for different components */}
        <Route
          path="/"
          element={
            <Uploader
              handleSubmit={handleSubmit} // Function to handle form submission
              description={description}
              setDescription={setDescription}
              handleError={handleError}
              useRecentFile={useRecentFile}
              setUseRecentFile={setUseRecentFile}
              useRecentDescription={useRecentDescription}
              setUseRecentDescription={setUseRecentDescription}
              token={token}
            />
          }
        />
        <Route path="/report" element={<Report token={token} />} />
        <Route path="/loader" element={<Loader loading={loading} />} />
        <Route
          path="/register"
          element={<Register setSuccess={setSuccess} setError={setError} />}
        />
        <Route
          path="/login"
          element={<Login handleLogin={handleLogin} />}
        />
      </Routes>
    </div>
  );
}

export default App;
