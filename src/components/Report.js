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
  const [report, setReport] = useState({
    checkList: {},
    matchingDetails: {},
    summary: "No report data available.",
    suggestions: "",
  });
  const [animatedScore, setAnimatedScore] = useState(0);

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  useEffect(() => {
    const storedReportData = localStorage.getItem("report");

    if (storedReportData && token) {
      setReport(JSON.parse(storedReportData));
    } else {
      navigate("/");
    }
  }, [token, navigate]);

  useEffect(() => {
    if (report.matchingDetails.overallScore) {
      let score = 0;
      const interval = setInterval(() => {
        if (score < report.matchingDetails.overallScore) {
          score += 1;
          setAnimatedScore(score);
        } else {
          clearInterval(interval);
        }
      }, 40);
    }
  }, [report.matchingDetails.overallScore]);

  return (
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
    </section>
  );
}

export default Report;
