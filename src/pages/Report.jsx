import { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "../style/Report.css";
import "../style/Animation.css";
import { useReactToPrint } from "react-to-print";
import ChecklistItem from "../components/CheckListItem";
import { ReportContext } from "../context/ReportContext";
import { ThemeContext } from "../context/ThemeContext";
import HighlightedPdf from "../components/HightLightKeyword";
import { InputDataContext } from "../context/InputDataContext";

function Report() {
  const { report } = useContext(ReportContext);
  const { file } = useContext(InputDataContext);
  const { isDark } = useContext(ThemeContext);

  const [animatedScore, setAnimatedScore] = useState(0);
  const [pdfUrl, setPdfUrl] = useState(null);
  const componentRef = useRef();

  useEffect(() => {
    if (file) {
      const url = URL.createObjectURL(file);
      setPdfUrl(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [file]);

  // ✅ Handle print
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  // ✅ Animate score
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
      }, 10);
      return () => clearInterval(interval);
    }
  }, [report.matchingDetails.overallScore]);

  return (
    <section className="report-container" ref={componentRef}>
      <aside className="report-sidebar">
        <h1 className="animate__animated animate__fadeInDown">
          {report.checkList.name
            ? `${report.checkList.name}'s Report`
            : "Report"}
        </h1>

        <section className="report-content">
          {/* Summary Section */}
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
                <strong>Readability: </strong>
                <span>{report.matchingDetails.readability || "Poor"}</span>
              </p>
              <p className="estimated-time puff-in-center">
                <strong>Estimated Reading Time: </strong>
                <span>{report.matchingDetails.estimatedReadingTime || "N/A"}</span>
              </p>
              <p className="action-verb puff-in-center">
                <strong>Action Verbs Used: </strong>
                <span>{report.matchingDetails.actionVerbsCount || "N/A"}</span>
              </p>
            </div>
          </div>

          {/* Checklist */}
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

          {/* Suggestions */}
          <div className="additional-section">
            <section
              className="suggestions-section animate__animated animate__fadeInUp checklist"
              id={isDark === "true" ? "dark-suggestions-section" : "light-theme"}
            >
              <h2>
                Suggestions (Enhance your resume by adding the following details)
              </h2>
              {report.matchingDetails.educationMissing && (
                <p>
                  <strong>Include following Education:</strong>{" "}
                  <span>{report.matchingDetails.educationMissing}</span>
                </p>
              )}
              {report.matchingDetails.experienceMissing && (
                <p>
                  <strong>Include following Experience:</strong>{" "}
                  <span>{report.matchingDetails.experienceMissing}</span>
                </p>
              )}
              {report.matchingDetails.keywordsMissing && (
                <p>
                  <strong>Include following Keywords:</strong>{" "}
                  <span>{report.matchingDetails.keywordsMissing}</span>
                </p>
              )}
              {report.matchingDetails.skillsMissing && (
                <p>
                  <strong>Include following Skills:</strong>{" "}
                  <span>{report.matchingDetails.skillsMissing}</span>
                </p>
              )}
              <p>
                <strong>Suggestions for optimization:</strong>{" "}
                <span>
                  {report.suggestions.length > 0
                    ? report.suggestions
                    : "No suggestions available."}
                </span>
              </p>
            </section>
          </div>
        </section>

        {/* Buttons */}
        <div className="report-btns">
          <Link to="/">
            <button className="btn">Recheck</button>
          </Link>
          <button className="btn" onClick={handlePrint}>
            Download Report
          </button>
        </div>

        {/* PDF Preview */}
        <div className="pdf-preview">
          <h2>Resume Preview (Keywords Highlighted)</h2>
          {pdfUrl ? (
            <HighlightedPdf
              fileUrl={pdfUrl}
              highlightedText={[report?.matchingDetails?.keywordsMatched] || []}
            />
          ) : (
            <p>No PDF file specified.</p>
          )}
        </div>
      </aside>
    </section>
  );
}

export default Report;
