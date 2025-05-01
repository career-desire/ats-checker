export const handleFileChange = (e) => {
  // Get the selected file from the event target
  const selectedFile = e.target.files[0];
  if (selectedFile) {
    // Create a URL for the selected file and store it in local storage
    const url = URL.createObjectURL(selectedFile);
    localStorage.setItem("resumePath", url);
  }
};
