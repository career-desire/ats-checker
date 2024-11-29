import html2pdf from "html2pdf.js";

// Function to generate PDF
export const downloadResumeAsPDF = (name) => {
  const resumeElement = document.querySelector(".report-sidebar");

  // Set options for the PDF generation, focusing on keeping text selectable
  const opt = {
    margin: 8, // Set margin (in inches)
    filename: `${name || "resume"}.pdf`, // Set filename, defaults to 'resume.pdf' if name is not provided
    image: { type: "jpeg", quality: 4.0 }, // Keep the quality of any images
    html2canvas: { scale: 3 }, // Scale the canvas at 1 (no extra scaling is needed)
    jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    pagebreak: { mode: ["avoid-all", "css", "legacy"] }, // Control page breaks for longer content
  };

  // Generate the PDF directly from the HTML element without converting to an image
  html2pdf().from(resumeElement).set(opt).save();
};