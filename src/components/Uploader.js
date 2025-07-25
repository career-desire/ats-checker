import React, { useRef } from "react";
import "../css/index.css";
import "animate.css";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useNavigate } from "react-router-dom";

// Uploader component for handling file uploads and job description input
function Uploader({
  handleSubmit,
  description, 
  setDescription, 
  handleError, 
  useRecentFile, 
  setUseRecentFile, 
  useRecentDescription,
  setUseRecentDescription, 
  token ,
  isDark,
  handleFileChange
}) {
  const navigate = useNavigate(); // Hook for navigation
  // Reference to the file input element
  const fileInputRef = useRef(null);

  // Get recent description from localStorage
  const descriptionText = localStorage.getItem("description") || "";

  // Toggle the use of recent description
  const handleRecentDescriptionToggle = (e) => {
    setUseRecentDescription(e.target.checked);

    if (e.target.checked) {
      setDescription(descriptionText); // Set description to recent one if checked
    } else {
      setDescription(""); // Clear description if not using recent
    }
  };

  // Handle form submission
  const onSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    const fileUploaded = fileInputRef.current.files.length > 0; // Check if file is uploaded
    const descriptionProvided = description.trim().length > 0; // Check if description is provided

    if (token) {
      if (fileUploaded && descriptionProvided) {
        handleSubmit(e); // Call submit handler if both file and description are provided
      } else {
        handleError("Please provide a file and a description."); // Show error if either is missing
      }
    } else {
      navigate('/login');
    }

    // Clear recent description flag after submission
    setUseRecentDescription("");
  };

  return (
    <div className="uploader-page" id={isDark === "true" ? "dark-uploader-page" : "non-dark" }>
      <form id="upload-form" encType="multipart/form-data" onSubmit={onSubmit}>
        <div className="uploading-section animate__animated animate__bounceInLeft">
          <div className="resume-uploader" id={isDark === "true" ? "dark-resume-uploader" : "non-dark" }>
            <label htmlFor="file">
              <h2>Upload a Resume</h2>
            </label>
            <input
              type="file"
              id="file"
              name="file"
              accept="application/pdf,.doc,.docx,application/msword"
              className="resume-input"
              ref={fileInputRef}
              onChange={handleFileChange}
            />
          </div>
          {/* Recent file section commented out, uncomment if needed */}
          {/* {resumeText ? (
            <div className="recent-data-section">
              <label htmlFor="recent-file">Use recent file</label>
              <input
                type="checkbox"
                name="recentFile"
                checked={useRecentFile}
                onChange={(e) => setUseRecentFile(e.target.checked)}
              />
            </div>
          ) : null} */}
          <div className="description">
            <h2>Add your job description</h2>
            <textarea
              placeholder="Paste here"
              className="description-input"
              id={isDark === "true" ? "dark-description-input" : "non-dark" }
              minLength="100"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              name="jobDescription"
            ></textarea>
          </div>
          {descriptionText ? (
            <div className="recent-data-section">
              <label htmlFor="recent-description">Use recent description</label>
              <input
                type="checkbox"
                name="recentDescription"
                checked={useRecentDescription}
                onClick={handleRecentDescriptionToggle}
                onChange={(e) => setUseRecentDescription(e.target.checked)}
              />
            </div>
          ) : null}
          <button type="submit" className="btn">
            Get Results
          </button>
        </div>
        <div className="intro-section animate__animated animate__fadeInRightBig" id={isDark === "true" ? "dark-intro-section" : "non-dark" }>
          <h1>ATS Checker integrated with AI</h1>
          <p>
            Optimize your resume with our ATS Checker—upload your resume, input
            the job description, and get instant feedback to boost your chances
            of landing the job.
          </p>
          <DotLottieReact
            src="https://lottie.host/25a95a7b-f71e-4c72-95ac-e0972c3fbe2d/Khnho4jRN8.json"
            loop
            autoplay
            className="intro-animation"
          />
        </div>
      </form>
      <div id="progress"></div>
    </div>
  );
}

export default Uploader;
