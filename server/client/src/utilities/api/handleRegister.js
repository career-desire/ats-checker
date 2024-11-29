export const handleRegisterApiCall = async (
  signUpForm, // Form data to be sent to the server for registration
  handleSuccess, // Function to set the success message
  setError, // Function to set the error message
  navigate // Function to navigate to a different route
) => {
  try {
    // Send a POST request to the server to register the user
    const response = await fetch(`${process.env.REACT_APP_SERVER}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(signUpForm),
    });

    // Check if the response is not OK (200-299)
    if (!response.ok) {
      // Get the error data from the response
      const data = await response.json();
      // Set the error message
      setError(data.message || "An error occurred");
      return;
    }

    // Get the response data
    const data = await response.json();
    // Set the success message
    handleSuccess(data.message);
    // Clear the error message
    setError(null);
    // Navigate to the login page after 1.5 seconds
    setTimeout(() => navigate("/login"), 1500);
  } catch (error) {
    // Set a generic error message if the request fails
    setError("Failed to connect to the server");
  }
};