import React, { useRef, useState, useEffect } from "react";
import "../css/index.css";
import "../css/Hero.css";
import "animate.css";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useNavigate } from "react-router-dom";
import { handleSubmit } from "../utilities/api/handleSubmit";
import { handleFileChange } from "../utilities/utilityFunction.js";

function Hero({
  handleError,
  isDark,
  setLoaderReport,
  handleSuccess,
  setLoading,
}) {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [reportStatus, setReportStatus] = useState(true);
  const [description, setDescription] = useState("");
  const [cachedescription, setCacheDescription] = useState(
    localStorage.getItem("description") || ""
  );

  // Define an array of loader reports to display
  const loaderReportArr = [
    "Gathering your data",
    "Extracting data from your resume",
    "Comparing your resume with job description",
    "Processing your resume report",
  ];

  // Toggle the use of recent description
  const handleRecentDescriptionToggle = (e) => {
    if (e.target.checked) {
      setDescription(cachedescription);
    } else {
      setDescription(""); // Clear description if not using recent
    }
  };

  // Handle form submission
  const onSubmit = (e) => {
    e.preventDefault();

    // Navigate to the loader page and set loading to true
    navigate("/loader");
    setLoading(true);

    const fileUploaded = fileInputRef.current.files.length > 0;
    const descriptionProvided = description.trim().length > 0;

    // Validate file and description
    if (!fileUploaded || !descriptionProvided) {
      return handleError("Please provide a file and a description.");
    } else {
      handleSubmit(
        navigate,
        fileInputRef,
        description,
        handleError,
        setDescription,
        setLoading,
        setReportStatus,
        loaderReportArr,
        reportStatus,
        handleSuccess,
        setLoaderReport
      );
    }
  };

  // Getting saved description from local storage
  useEffect(() => {
    const storedDescription = localStorage.getItem("description");
    if (storedDescription) {
      setCacheDescription(storedDescription);
    }
  }, []);

  return (
    <div
      className="uploader-page"
      id={isDark === "true" ? "dark-uploader-page" : "light-theme"}
    >
      <form id="upload-form" encType="multipart/form-data" onSubmit={onSubmit}>
        <div className="uploading-section animate__animated animate__bounceInLeft">
          <div
            className="resume-uploader"
            id={isDark === "true" ? "dark-resume-uploader" : "light-theme"}
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
            <p>Max 1MB</p>
            <p>Supported file format PDF, DOCX, DOC</p>
          </div>
          <div className="description">
            <h2>Add your job description</h2>
            <textarea
              placeholder="Paste you job description here"
              className="description-input"
              id={isDark === "true" ? "dark-description-input" : "light-theme"}
              minLength="100"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              name="jobDescription"
            ></textarea>
          </div>
          {cachedescription ? (
            <div className="recent-data-section">
              <label htmlFor="recent-description">Use recent description</label>
              <input
                type="checkbox"
                name="recentDescription"
                onClick={handleRecentDescriptionToggle}
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
        id={isDark === "true" ? "dark-intro-section" : "light-theme"}
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

export default Hero;
