import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../css/Report.css";
import Tick from "../assets/tick.png";
import Wrong from "../assets/wrong.png";
import { useNavigate } from "react-router-dom";

function Report({ token }) {
  const navigate = useNavigate(); // Hook for navigation
  const [report, setReport] = useState({
    checkList: {},
    matchingDetails: {},
    summary: "No report data available.",
    suggestions: "",
  });

  const [loadedItems, setLoadedItems] = useState([]);
  const [animatedScore, setAnimatedScore] = useState(0); // State to animate the score

  useEffect(() => {
    const storedReportData = localStorage.getItem("report");

    if (storedReportData && token) {
      setReport(JSON.parse(storedReportData));
    } else {
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
    if (report.matchingDetails.overallScore) {
      let score = 0;
      const interval = setInterval(() => {
        if (score < report.matchingDetails.overallScore) {
          score += 1; // Increase the score gradually
          setAnimatedScore(score);
        } else {
          clearInterval(interval); // Clear interval when target score is reached
        }
      }, 40); // Adjust speed of count-up
    }
  }, [report.matchingDetails.overallScore]);

  return (
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
    </section>
  );
}

export default Report;
