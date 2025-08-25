import React, { useRef, useState, useEffect, useContext } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useNavigate } from "react-router-dom";
import { handleSubmit } from "../service/handleSubmit";
import { ThemeContext } from "../context/ThemeContext";
import { LoadingContext } from "../context/LoadingContext";
import { AlertContext } from "../context/AlertContext";
import { InputDataContext } from "../context/InputDataContext";
import { AuthContext } from "../context/AuthContext";
import "../style/Home.css";
import "animate.css";
import { ReportContext } from "../context/ReportContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import { Tooltip } from "react-tooltip";

const defaultJobDescriptions = {
  "Software Engineer":
    "We are seeking a Software Engineer to design, develop, and maintain scalable applications. The role involves writing clean, efficient code, collaborating with cross-functional teams, performing code reviews, and troubleshooting production issues. Strong knowledge of JavaScript, React, Node.js, and cloud platforms is required.",

  "Frontend Developer":
    "We are hiring a Frontend Developer to build user-friendly, responsive, and accessible interfaces. Responsibilities include translating UI/UX designs into code, optimizing performance, and ensuring cross-browser compatibility. Must be skilled in React, HTML, CSS, and JavaScript frameworks.",

  "Backend Developer":
    "Looking for a Backend Developer to create and maintain REST APIs, manage databases, and optimize server performance. The role requires strong knowledge of Node.js, Express, MongoDB, and authentication systems. Experience with scalable architectures and security best practices is preferred.",

  "Full Stack Developer":
    "We need a Full Stack Developer proficient in both frontend and backend technologies. Responsibilities include building complete web applications, deploying on cloud platforms, and collaborating with designers and product teams. Required skills: React, Node.js, databases, and REST APIs.",

  "Data Analyst":
    "We are seeking a Data Analyst to collect, clean, and analyze datasets, generate dashboards, and provide actionable insights. Proficiency in SQL, Excel, and visualization tools such as Tableau or Power BI is required. Experience with Python or R for data analysis is a plus.",

  "Data Scientist":
    "Hiring a Data Scientist to build predictive models, apply machine learning algorithms, and perform statistical analysis. Responsibilities include feature engineering, data preprocessing, and delivering business insights. Skills required: Python, ML frameworks, and big data tools.",

  "Project Manager":
    "We need a Project Manager to oversee project planning, execution, and delivery. The role includes managing teams, tracking milestones, coordinating stakeholders, and ensuring timely delivery within budget. Strong organizational and leadership skills are essential.",

  "Product Manager":
    "Seeking a Product Manager to define product vision, roadmap, and strategy. Responsibilities include gathering user requirements, prioritizing features, and collaborating with engineering and design teams to deliver customer-focused solutions. Strong communication and analytical skills required.",

  "UI/UX Designer":
    "We are looking for a UI/UX Designer to create engaging, intuitive, and visually appealing designs. Responsibilities include wireframing, prototyping, conducting user research, and collaborating with developers. Proficiency in Figma, Sketch, or Adobe XD is required.",

  "Graphic Designer":
    "Hiring a Graphic Designer to produce digital and print assets, including social media creatives, infographics, and marketing materials. Must have strong visual storytelling skills and proficiency in Adobe Creative Suite (Photoshop, Illustrator, InDesign).",

  "Marketing Specialist":
    "We are hiring a Marketing Specialist to design campaigns, manage digital channels, and track KPIs. Responsibilities include SEO optimization, social media management, and email marketing. Analytical mindset and experience with Google Analytics and Ads are preferred.",

  "Business Analyst":
    "Looking for a Business Analyst to bridge the gap between business needs and technical solutions. Duties include gathering requirements, preparing documentation, conducting data analysis, and working with stakeholders to implement solutions.",

  "HR Manager":
    "We are seeking an HR Manager to handle recruitment, employee engagement, performance management, and compliance. Responsibilities include developing HR policies, managing employee relations, and supporting organizational culture initiatives.",

  "Customer Support Specialist":
    "We need a Customer Support Specialist to assist clients via phone, email, and chat. Responsibilities include resolving issues, documenting feedback, and escalating complex problems. Strong communication and problem-solving skills are essential.",

  "DevOps Engineer":
    "Hiring a DevOps Engineer to automate deployments, manage CI/CD pipelines, and ensure system reliability. Responsibilities include monitoring infrastructure, optimizing performance, and working with Docker, Kubernetes, and cloud platforms like AWS or GCP."
};


function Home() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [useRecentDescription, setUseRecentDescription] = useState(false)
  const [recentDescription, setRecentDescription] = useState(localStorage.getItem("description") || "");
  const [selectedJob, setSelectedJob] = useState("");

  const { isDark } = useContext(ThemeContext);
  const { setReport, setResumeText } = useContext(ReportContext);
  const { user, token } = useContext(AuthContext);
  const { setLoading, setLoadingText } = useContext(LoadingContext);
  const { setAlert, setAlertMessage } = useContext(AlertContext);
  const { file, setFile, description, setDescription } = useContext(InputDataContext);

  const handleJobChange = (e) => {
    const job = e.target.value;
    setSelectedJob(job);

    if (job && defaultJobDescriptions[job]) {
      setDescription(defaultJobDescriptions[job]);
    } else {
      setDescription("");
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
  };

  const handleRecentDescriptionToggle = (e) => {
    setUseRecentDescription(e.target.checked);

    if (e.target.checked) {
      setDescription(recentDescription);
    } else {
      setDescription("");
    }
  };

  useEffect(() => {
    if (description) {
      localStorage.setItem("description", description)
    }
  }, [description])

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      setAlert("failed");
      setAlertMessage("Please upload a resume file.");
      return;
    }

    if (!description || description.length < 100) {
      setAlert("failed");
      setAlertMessage("Please provide a job description (min 100 characters).");
      return;
    }

    setLoading(true);
    setLoadingText(true);

    try {
      const response = await handleSubmit(token, file, description, user);

      if (response) {
        setTimeout(() => {
          console.log(response.layoutInfo);
          navigate("/report");
          setReport(response.atsReport);
          setResumeText(response.resumeText);
          setLoading(false);
          setLoadingText(false);
          setAlert("success");
          setAlertMessage(response.message);
        }, 5000);
      } else {
        setLoading(false);
        setLoadingText(false);
      }
    } catch (err) {
      console.error(err);
      setAlert("failed");
      setAlertMessage("Something went wrong. Try again.");
      setLoading(false);
      setLoadingText(false);
    } 
  };


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
            <div className={`default-description ${isDark === "true" ? "dark" : ""}`}>
              <select
                value={selectedJob}
                onChange={handleJobChange}
                className="job-select"
              >
                <option value="">Select a example description</option>
                {Object.keys(defaultJobDescriptions).map((job) => (
                  <option key={job} value={job}>
                    {job}
                  </option>
                ))}
              </select>
              <FontAwesomeIcon
                icon={faQuestionCircle}
                data-tooltip-id="job-desc-tip"
                className="tool-tip"
              />
              <Tooltip
                id="job-desc-tip"
                place="right"
                effect="solid"
                style={{ maxWidth: "250px", fontSize: "14px" }}
              >
                Tip: Leave the dropdown unselected if you want to type your own custom job description.
              </Tooltip>
            </div>
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
          {recentDescription ? (
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
