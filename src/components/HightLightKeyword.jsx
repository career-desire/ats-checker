import { useState, useEffect, useRef } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/TextLayer.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export default function HighlightedPdf({ fileUrl, highlightedText }) {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.0);
  const [maxScale, setMaxScale] = useState(2.2);
  const containerRef = useRef(null);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  // ✅ Adjust max scale based on container width
  useEffect(() => {
    function updateMaxScale() {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        let newMaxScale;

        console.log(containerWidth)
        if (containerWidth > 1400) {
          newMaxScale = 2.2;
        } else if (containerWidth > 1150) {
          newMaxScale = 2.0;
        } else if (containerWidth > 1000) {
          newMaxScale = 1.8;
        } else if (containerWidth > 850) {
          newMaxScale = 1.4;
        } else if (containerWidth > 600) {
          newMaxScale = 1;
        } else if (containerWidth > 480) {
          newMaxScale = 0.8;
        } else if (containerWidth > 360) {
          newMaxScale = 0.6;
        } else {
          newMaxScale = 0.5;
        }

        setMaxScale(newMaxScale);
        setScale(prev => Math.min(prev, newMaxScale)); // ✅ Use newMaxScale directly
      }
    }

    updateMaxScale();
    window.addEventListener('resize', updateMaxScale);
    return () => window.removeEventListener('resize', updateMaxScale);
  }, []);

  const keywordList = highlightedText.flatMap(item =>
    item.split(',').map(k => k.trim()).filter(k => k.length > 0)
  );

  useEffect(() => {
    if (!keywordList.length) return;

    const timeout = setTimeout(() => {
      const textLayers = document.querySelectorAll('.react-pdf__Page__textContent');

      textLayers.forEach(layer => {
        let html = layer.innerHTML;
        keywordList.forEach(keyword => {
          const safeKeyword = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
          const regex = new RegExp(`(${safeKeyword})`, 'gi');
          html = html.replace(regex, '<mark>$1</mark>');
        });
        layer.innerHTML = html;
      });
    }, 500);

    return () => clearTimeout(timeout);
  }, [pageNumber, keywordList]);

  return (
    <div className="highlighted-resume" ref={containerRef}>
      {/* Pagination Controls */}
      <div className="pagination-controls">
        <button
          onClick={() => setPageNumber(prev => (prev > 1 ? prev - 1 : prev))}
          className="btn"
          disabled={pageNumber < 2}
        >
          Prev
        </button>
        <span className="page-info">Page {pageNumber} of {numPages || '--'}</span>
        <button
          onClick={() => setPageNumber(prev => (prev < numPages ? prev + 1 : prev))}
          className="btn"
          disabled={pageNumber >= numPages}
        >
          Next
        </button>
      </div>

      {/* Zoom Controls */}
      <div className="zoom-controls">
        <button
          onClick={() => setScale(prev => Math.max(prev - 0.2, 0.5))}
          className="btn"
          disabled={scale <= 0.5}
        >
          Zoom Out
        </button>
        <span className="zoom-info">Zoom: {(scale * 100).toFixed(0)}%</span>
        <button
          onClick={() => setScale(prev => Math.min(prev + 0.2, maxScale))}
          className="btn"
          disabled={scale >= maxScale}
        >
          Zoom In
        </button>
      </div>

      {/* PDF Viewer */}
      <div className="pdf-container">
        <Document file={fileUrl} onLoadSuccess={onDocumentLoadSuccess}>
          <Page pageNumber={pageNumber} renderTextLayer={true} scale={scale} />
        </Document>
      </div>
    </div>
  );
}