import React from "react";

function PDFViewer({ pdfPath }) {
  return (
    <div className="embed-container">
      <embed
        id="plugin"
        type="application/pdf"
        src="/assets/Resume (Dhamodharan B).pdf"
        style={{ display: 'block' }} // Optional, to ensure it behaves as a block element
      />
    </div>
  );
}

export default PDFViewer;
