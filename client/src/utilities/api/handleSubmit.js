export const handleSubmit = async (
  navigate,
  fileInputRef,
  description,
  handleError,
  setDescription,
  setLoading,
  setReportStatus,
  loaderReportArr,
  reportStatus,
  handleSuccess
) => {
  try {
    // Check if user is logged in
    const token = localStorage.getItem("token");
    if (!token) return navigate("/login");

    // Get user ID from local storage
    const userId = localStorage.getItem("userId");

    // Create form data for API request
    const formData = new FormData();
    formData.append("file", fileInputRef.current.files[0]);
    formData.append("description", description);
    formData.append("userId", userId);

    // Send POST request to server to generate resume report
    const response = await fetch(
      `${process.env.REACT_APP_SERVER}/resume-report`,
      {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      }
    );

    // Check if response is OK
    if (!response.ok) {
      const errorData = await response.json();
      return handleError(errorData.message || "Error submitting resume report");
    }

    // Get response data and store in local storage
    const result = await response.json();

    const cacheResume = localStorage.getItem("resume") || "";
    const cacheDescription = localStorage.getItem("description") || "";

    // Compare with cached data
    if (
      result.extractedText.trim().toLowerCase() !==
        cacheResume.trim().toLowerCase() ||
      description.trim().toLowerCase() !== cacheDescription.trim().toLowerCase()
    ) {
      console.log("new report");

      localStorage.setItem("resumeReport", JSON.stringify(result.report));
      localStorage.setItem("resume", result.extractedText);
      localStorage.setItem("description", description);
    }
  } catch (error) {
    // Handle server error
    setReportStatus(false);
    setLoading(false);
    navigate("/");
    handleError("Unfortunately report is not generated!");
  } finally {
    if (reportStatus) {
      setTimeout(() => {
        setLoading(false);
        navigate("/report");
        handleSuccess("Resume report is generated!");
      }, loaderReportArr.length * 4000); // Navigate after all reports
    }
    setDescription(" ");
  }
};
