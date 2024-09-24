<<<<<<< HEAD
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "../css/Report.css";
import "../css/Animation.css";
import { useNavigate } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import ChecklistItem from "./CheckListItem";

function Report({ token, isDark }) {
  const pdfPath = localStorage.getItem("resumePath");

  const navigate = useNavigate();
=======
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../css/Report.css";
import Tick from "../assets/tick.png";
import Wrong from "../assets/wrong.png";
import { useNavigate } from "react-router-dom";

function Report({ token }) {
  const navigate = useNavigate(); // Hook for navigation
>>>>>>> e6a75a2e2d3d167d5524804ee0236afa96df6502
  const [report, setReport] = useState({
    checkList: {},
    matchingDetails: {},
    summary: "No report data available.",
    suggestions: "",
  });
<<<<<<< HEAD
  const [animatedScore, setAnimatedScore] = useState(0);

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
=======

  const [loadedItems, setLoadedItems] = useState([]);
  const [animatedScore, setAnimatedScore] = useState(0); // State to animate the score
>>>>>>> e6a75a2e2d3d167d5524804ee0236afa96df6502

  useEffect(() => {
    const storedReportData = localStorage.getItem("report");

    if (storedReportData && token) {
      setReport(JSON.parse(storedReportData));
    } else {
<<<<<<< HEAD
      navigate("/");
    }
  }, [token, navigate]);

  useEffect(() => {
=======
      setReport({
        checkList: {},
        matchingDetails: {},
        summary: "No report data available.",
        suggestions: "",
      });
      navigate('/');
    }
  }, [token]);

  useEffect(() => {
    const checklistKeys = Object.keys(report.checkList);
    checklistKeys.forEach((item, index) => {
      setTimeout(() => {
        setLoadedItems((prevItems) => [...prevItems, item]);
      }, index * 200);
    });
  }, [report.checkList]);

  // Animate the score count-up effect
  useEffect(() => {
>>>>>>> e6a75a2e2d3d167d5524804ee0236afa96df6502
    if (report.matchingDetails.overallScore) {
      let score = 0;
      const interval = setInterval(() => {
        if (score < report.matchingDetails.overallScore) {
<<<<<<< HEAD
          score += 1;
          setAnimatedScore(score);
        } else {
          clearInterval(interval);
        }
      }, 40);
=======
          score += 1; // Increase the score gradually
          setAnimatedScore(score);
        } else {
          clearInterval(interval); // Clear interval when target score is reached
        }
      }, 40); // Adjust speed of count-up
>>>>>>> e6a75a2e2d3d167d5524804ee0236afa96df6502
    }
  }, [report.matchingDetails.overallScore]);

  return (
<<<<<<< HEAD
    <section className="report-page" ref={componentRef}>
      <aside className=" aside-report-section">
        <h1 className="animate__animated animate__fadeInDown">
          {`${report.checkList.name}'s Report`}
        </h1>
        <section className="report-sections">
          <div
            className="overall-report-session"
            id={isDark === "true" ? "dark-overall-report-session" : "non-dark"}
          >
            <div className="total-score">
              <div
                className="progress-circle"
                style={{ "--progress": `${animatedScore}%` }}
              >
                <h1>{animatedScore}</h1>
                <p>Relevant Score</p>
              </div>
            </div>
            <p className="puff-in-center">{report.summary}</p>
            <div className="overall-report">
              <p className="readability puff-in-center">
                <strong>Readability:</strong>
                <span>
                  {" " + report.matchingDetails.readability || "Poor"}
                </span>
              </p>
              <p className="estimated-time puff-in-center">
                <strong>Estimated Reading Time:</strong>{" "}
                <span>
                  {report.matchingDetails.estimatedReadingTime || "N/A"}
                </span>
              </p>
              <p className="action-verb puff-in-center">
                <strong>Action Verbs Used:</strong>{" "}
                <span>{report.matchingDetails.actionVerbsUsed || "N/A"}</span>
              </p>
            </div>
          </div>
          <section
            className="checklist-container"
            id={isDark === "true" ? "dark-checklist-container" : "non-dark"}
          >
            <h2>Checklist</h2>
            <div className="checklists">
              <ChecklistItem label="Name" value={report.checkList.name} />
              <ChecklistItem label="Job Role" value={report.checkList.jobRole} />
              <ChecklistItem label="Mobile" value={report.checkList.number} />
              <ChecklistItem label="Email" value={report.checkList.email} />
              <ChecklistItem label="LinkedIn" value={report.checkList.linkedIn} />
              <ChecklistItem label="Location" value={report.checkList.location} />
              <ChecklistItem label="Portfolio" value={report.checkList.portfolio} />
              <ChecklistItem label="Summary" value={report.checkList.summary && "Yes"} />
              <ChecklistItem label="Awards And Recognition" value={report.checkList.awardsAndRecognition} />
              <ChecklistItem label="Education" value={report.checkList.education} />
              <ChecklistItem label="Projects" value={report.checkList.projects} />
              <ChecklistItem label="Certifications" value={report.checkList.certifications} />
              <ChecklistItem label="Languages Known" value={report.checkList.languagesKnown} />
            </div>
          </section>
          <div className="other-section">
            <section
              className="suggestions-section animate__animated animate__fadeInUp checklist"
              id={isDark === "true" ? "dark-suggestions-section" : "non-dark"}
            >
=======
    <section className="report-page">
      <h1 className="animate__animated animate__fadeInDown">Your Resume Report</h1>
      <section className="report-sections">
        {/* Total Score Section with Animation */}
        <div className="total-score">
          <div className="progress-circle" style={{ "--progress": `${animatedScore}%` }}>
            <p>{animatedScore}</p> {/* Display animated score */}
            <p>Score</p>
          </div>
        </div>

        {/* Overall Report */}
        <div className="overall-report">
          <p className="readability puff-in-center">
            <strong>Readability:</strong>{" "}
            <span>{report.matchingDetails.readability || "N/A"}</span>
          </p>
          <p className="estimated-time puff-in-center">
            <strong>Estimated reading time:</strong>{" "}
            <span>{report.matchingDetails.estimatedReadingTime || "N/A"}</span>
          </p>
          <p className="action-verb puff-in-center">
            <strong>Action verbs used:</strong>{" "}
            <span>{report.matchingDetails.actionVerbsUsed || "N/A"}</span>
          </p>
        </div>

        {/* Checklist Section */}
        <section className="checklist">
          {Object.entries(report.checkList).map(([key, value], index) => (
            <div
              key={key}
              className={loadedItems.includes(key) ? "loaded" : "loading"}
            >
              <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong>
              <div>
                {value ? (
                  <>
                    <p>{value}</p>
                    <img src={Tick} className="checklist-img" alt="tick" />
                  </>
                ) : (
                  <img src={Wrong} className="checklist-img" alt="wrong" />
                )}
              </div>
            </div>
          ))}
        </section>

        {/* Other Sections */}
        <div className="other-section">
          {/* Suggestions Section */}
          {(
            report.matchingDetails.educationMissing ||
            report.matchingDetails.experienceMissing ||
            report.matchingDetails.keywordsMissing ||
            report.matchingDetails.skillsMissing
          ) && (
            <section className="suggestions-section animate__animated animate__fadeInUp">
>>>>>>> e6a75a2e2d3d167d5524804ee0236afa96df6502
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
<<<<<<< HEAD
                <strong>Suggestion:</strong>{" "}
                <span>{report.suggestions || "No suggestions available."}</span>
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
=======
                <strong>Overview:</strong>{" "}
                <span>{report.suggestions || "No suggestions available."}</span>
              </p>
            </section>
          )}

          {/* Summary Section */}
          <section className="summary-section animate__animated animate__fadeInUp">
            <h2>Summary of your resume</h2>
            <p>{report.summary || "No summary available."}</p>
          </section>
        </div>
      </section>
      <Link to="/">
        <button className="btn">Recheck</button>
      </Link>
>>>>>>> e6a75a2e2d3d167d5524804ee0236afa96df6502
    </section>
  );
}

export default Report;
