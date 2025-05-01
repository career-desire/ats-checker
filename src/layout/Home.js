import React, { useRef, useState, useEffect } from "react";
import "../css/index.css";
import "../css/Uploader.css";
import "animate.css";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useNavigate } from "react-router-dom";
import { handleSubmit } from "../utilities/api/handleSubmit";

// Uploader component for handling file uploads and job description input
function Home({
  description,
  setDescription,
  handleError,
  useRecentDescription,
  setUseRecentDescription,
  isDark,
  handleFileChange,
  setLoaderReport,
  handleSuccess,
  setLoading,
}) {
  const navigate = useNavigate(); // Hook for navigation
  const fileInputRef = useRef(null); // Reference to the file input element
  const [descriptionText, setDescriptionText] = useState(
    localStorage.getItem("description") || ""
  );

  // Define an array of loader reports to display
  const loaderReportArr = [
    "Gathering your data",
    "Extracting data from your resume",
    "Comparing your resume with job description",
    "Your report is ready",
  ];

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
    
    // Navigate to the loader page and set loading to true
    navigate("/loader");
    setLoading(true);

    handleSubmit(
      fileUploaded,
      descriptionProvided,
      navigate,
      fileInputRef,
      description,
      handleError,
      setUseRecentDescription,
      setDescription,
      setLoaderReport,
      setLoading,
      handleSuccess
    );

    // Iterate over the loader reports and display each one after a delay
    loaderReportArr.forEach((report, i) => {
      setTimeout(() => {
        // Update the loader report state with the current report
        setLoaderReport(report);
      }, i * 4000); // Stagger the messages by 4 seconds each
    });

    // After all reports have been displayed, navigate to the report page and display a success message
    setTimeout(() => {
      setLoading(false);
      navigate("/report");
      handleSuccess("Your resume report is ready!");
    }, loaderReportArr.length * 4000); // Navigate after all reports
  };

  useEffect(() => {
    const storedDescription = localStorage.getItem("description");
    if (storedDescription) {
      setDescriptionText(storedDescription);
    }
  }, []);

  return (
    <div
      className="uploader-page"
      id={isDark === "true" ? "dark-uploader-page" : "non-dark"}
    >
      <form id="upload-form" encType="multipart/form-data" onSubmit={onSubmit}>
        <div className="uploading-section animate__animated animate__bounceInLeft">
          <div
            className="resume-uploader"
            id={isDark === "true" ? "dark-resume-uploader" : "non-dark"}
          >
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
          <div className="description">
            <h2>Add your job description</h2>
            <textarea
              placeholder="Paste here"
              className="description-input"
              id={isDark === "true" ? "dark-description-input" : "non-dark"}
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
            Get Result
          </button>
        </div>
      </form>
      <div
        className="intro-section animate__animated animate__fadeInRightBig"
        id={isDark === "true" ? "dark-intro-section" : "non-dark"}
      >
        <h1>ATS Checker integrated with AI</h1>
        <p>
          Optimize your resume with our ATS Checker—upload your resume, input
          the job description, and get instant feedback to boost your chances of
          landing the job.
        </p>
        <DotLottieReact
          src="https://lottie.host/25a95a7b-f71e-4c72-95ac-e0972c3fbe2d/Khnho4jRN8.json"
          loop
          autoplay
          className="intro-animation"
        />
      </div>
    </div>
  );
}

export default Home;
