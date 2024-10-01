import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/Report.css";
import "../css/Animation.css";
import { useReactToPrint } from "react-to-print";
import ChecklistItem from "../components/CheckListItem";

function Report({ token, isDark }) {
  const pdfPath = localStorage.getItem("resumePath");
  const navigate = useNavigate();

  const [report, setReport] = useState({
    checkList: {
      name: null,
      jobRole: null,
      number: null,
      email: null,
      linkedIn: null,
      location: null,
      portfolio: null,
      summary: null,
      awardsAndRecognition: null,
      education: null,
      projects: null,
      certifications: null,
      languagesKnown: null,
    },
    matchingDetails: {
      overallScore: 0,
      readability: null,
      actionVerbsUsed: 0,
      estimatedReadingTime: null,
      keywordsMatched: [],
      keywordsMissing: [],
      skillsMatched: [],
      skillsMissing: [],
      experienceMatched: [],
      experienceMissing: [],
      educationMatched: [],
      educationMissing: [],
    },
    summary: "No report data available.",
    suggestions: [],
  });

  const [animatedScore, setAnimatedScore] = useState(0);
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  useEffect(() => {
    const storedReportData = localStorage.getItem("resumeReport");
    if (storedReportData && token) {
      const parsedReportData = JSON.parse(storedReportData);
      setReport(parsedReportData);
    } else {
      navigate("/");
    }
  }, [token, navigate]);

  useEffect(() => {
    if (report.matchingDetails.overallScore > 0) {
      let score = 0;
      const interval = setInterval(() => {
        if (score < report.matchingDetails.overallScore) {
          score += 1;
          setAnimatedScore(score);
        } else {
          clearInterval(interval);
        }
      }, 40);
      return () => clearInterval(interval); // Cleanup on unmount
    }
  }, [report.matchingDetails.overallScore]);

  return (
    <section className="report-container" ref={componentRef}>
      <aside className="report-sidebar">
        <h1 className="animate__animated animate__fadeInDown">
          {report.checkList.name ? `${report.checkList.name}'s Report` : "Report"}
        </h1>
        <section className="report-content">
          <div
            className="report-summary"
            id={isDark === "true" ? "dark-report-summary" : "light-report-summary"}
          >
            <div className="score-container">
              <div className="score-circle">
                <h1>{animatedScore}</h1>
                <p>Relevant Score</p>
              </div>
            </div>
            <p className="puff-in-center">{report.summary}</p>
            <div className="report-description">
              <p className="readability puff-in-center">
                <strong>Readability:</strong>
                <span>{" " + (report.matchingDetails.readability || "Poor")}</span>
              </p>
              <p className="estimated-time puff-in-center">
                <strong>Estimated Reading Time:</strong>{" "}
                <span>{report.matchingDetails.estimatedReadingTime || "N/A"}</span>
              </p>
              <p className="action-verb puff-in-center">
                <strong>Action Verbs Used:</strong>{" "}
                <span>{report.matchingDetails.actionVerbsUsed || "N/A"}</span>
              </p>
            </div>
          </div>
          <section
            className="checklist-container"
            id={isDark === "true" ? "dark-checklist-container" : "light-theme"}
          >
            <h2>Checklist</h2>
            <div className="checklists">
              {Object.entries(report.checkList).map(([label, value]) => (
                <ChecklistItem key={label} label={label} value={value} />
              ))}
            </div>
          </section>
          <div className="additional-section">
            <section
              className="suggestions-section animate__animated animate__fadeInUp checklist"
              id={isDark === "true" ? "dark-suggestions-section" : "light-theme"}
            >
              <h2>Suggestions (Enhance your resume by adding the following details)</h2>
              {report.matchingDetails.educationMissing && (
                <p>
                  <strong>Education:</strong>{" "}
                  <span>{report.matchingDetails.educationMissing}</span>
                </p>
              )}
              {report.matchingDetails.experienceMissing && (
                <p>
                  <strong>Experience:</strong>{" "}
                  <span>{report.matchingDetails.experienceMissing}</span>
                </p>
              )}
              {report.matchingDetails.keywordsMissing && (
                <p>
                  <strong>Keywords:</strong>{" "}
                  <span>{report.matchingDetails.keywordsMissing}</span>
                </p>
              )}
              {report.matchingDetails.skillsMissing && (
                <p>
                  <strong>Skills:</strong>{" "}
                  <span>{report.matchingDetails.skillsMissing}</span>
                </p>
              )}
              <p>
                <strong>Suggestion:</strong>{" "}
                <span>
                  {report.suggestions.length > 0
                    ? report.suggestions
                    : "No suggestions available."}
                </span>
              </p>
            </section>
          </div>
        </section>
        <div className="report-btns">
          <Link to="/">
            <button className="btn">Recheck</button>
          </Link>
          <button className="btn" onClick={handlePrint}>
            Save report
          </button>
        </div>
      </aside>
      <div className="embed-container">
        <embed
          id="plugin"
          type="application/pdf"
          src={pdfPath}
          style={{ display: "block" }}
        />
      </div>
    </section>
  );
}

export default Report;