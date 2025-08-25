import React, { useContext, useEffect, useState } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { LoadingContext } from "../context/LoadingContext";
import "../style/index.css";
import { ThemeContext } from "../context/ThemeContext";

function Loader() {
  const [step, setStep] = useState(0);

  const { loading, loadingText } = useContext(LoadingContext);
  const { isDark } = useContext(ThemeContext);

  const loaderText = [
    "Gathering your data",
    "Extracting data from your resume",
    "Comparing your resume with job description",
    "Your report is ready",
  ];

  useEffect(() => {
    let interval;

    if (loading) {
      setStep(0);

      interval = setInterval(() => {
        setStep((prev) => (prev + 1) % loaderText.length);
      }, 2000);
    }

    return () => clearInterval(interval);
  }, [loading]);

  if (!loading) return null;

  return (
    <div className={isDark === "true" ? "loader-page loader-page-dark" : "loader-page"}>
      <DotLottieReact
        src="https://lottie.host/be03d629-8e46-4af8-92df-b9368d0fdb74/YJfi4e7aWn.json"
        loop
        autoplay
      />
      <div className="loader-report">
        <h3>{loadingText ? loaderText[step] : "Loading"} . . .</h3>
        <div className="loader"></div>
      </div>
    </div>
  );
}

export default Loader;
