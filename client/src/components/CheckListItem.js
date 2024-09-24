import React, { useState } from 'react';
import "../css/Report.css"
import Tick from "../assets/tick.png";
import Wrong from "../assets/wrong.png";

// Checklist Item Component with "See More" functionality
const ChecklistItem = ({ label, value }) => {
  const [showMore, setShowMore] = useState(false);

  const toggleShowMore = () => setShowMore(!showMore);

  return (
    <div className="checklist-item">
      <strong>{label}: {" "}{value && <img src={Tick} className="checklist-img" alt="tick" />}</strong>
      <div className="checklist-box">
        {value ? (
          <>
            {showMore ? (
              <p>{value}</p>
            ):(
              <p>{value.length > 50 ? value.slice(0, 50) + "..." : value}</p>
            )}
            {value.length > 50 && (
              <button onClick={toggleShowMore}>
                {showMore ? "Show Less" : "See More"}
              </button>
            )}
          </>
        ) : (
          <img src={Wrong} className="checklist-img" alt="wrong" />
        )}
      </div>
    </div>
  );
};

export default ChecklistItem;
