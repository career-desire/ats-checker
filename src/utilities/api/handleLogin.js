export const handleLoginApiCall = async (e, handleSuccess, handleError, navigate) => {
  try {
    // Extract email and password from the form data
    const logInForm = {
      email: e.target.email.value.toLowerCase().trim(),
      password: e.target.password.value,
    };

    // Send a POST request to the login API endpoint
    const response = await fetch(`${process.env.REACT_APP_SERVER}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(logInForm),
    });

    // Check if the response was successful
    if (!response.ok) {
      // If not, extract the error message from the response and call the error handler
      const data = await response.json();
      handleError(data.message || "An error occurred");
      return;
    }

    // If the response was successful, extract the data and call the success handler
    const data = await response.json();
    handleSuccess(data.message);
    handleError(null);

    // Store the token and expiration time in local storage
    localStorage.setItem("token", data.token);
    localStorage.setItem("expiresAt", data.expiresAt);

    // Navigate to the home page
    navigate("/");
  } catch (error) {
    // If an error occurred during the API call, call the error handler with a generic error message
    handleError("Failed to connect to the server");
  }
};