import { createContext, useEffect, useState } from 'react'

export const ReportContext = createContext();

export function ReportProvider({ children }) {
    const [resumeText, setResumeText] = useState(() => {
        const storedResumeText = localStorage.getItem("resume-text");
        return storedResumeText ? JSON.parse(storedResumeText) : ""
    });

    const [report, setReport] = useState(() => {
        const storedReport = localStorage.getItem("report");
        return storedReport ? JSON.parse(storedReport) : {
            checkList: {
                name: null,
                jobRole: null,
                number: null,
                email: null,
                linkedIn: null,
                location: null,
                portfolio: null,
                summary: null,
                recognition: null,
                education: null,
                projects: null,
                certifications: null,
                languages: null,
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
        };
    });

    // keep localStorage in sync
    useEffect(() => {
        localStorage.setItem("report", JSON.stringify(report));
    }, [report]);

    useEffect(() => {
        localStorage.setItem("resume-text", JSON.stringify(resumeText));
    }, [resumeText]);

    return (
        <ReportContext.Provider value={{ report, setReport, resumeText, setResumeText }}>
            {children}
        </ReportContext.Provider>
    );
};