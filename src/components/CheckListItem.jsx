import React, { useEffect, useState } from 'react';
import "../style/Report.css"
import Tick from "../assets/tick.png";
import Wrong from "../assets/wrong.png";

// Checklist Item Component with "See More" functionality
const ChecklistItem = ({ label, value }) => {
  const [showMore, setShowMore] = useState(false);
  const [className, setClassName] = useState("null");

  const toggleShowMore = () => setShowMore(!showMore);

  useEffect(() => {
    if (label === "email") {
      setClassName("checklist-box link")
    } else if (label === "linkedIn") {
      setClassName("checklist-box link")
    } else if (label === "portfolio") {
      setClassName("checklist-box link")
    } else {
      setClassName("checklist-box")
    }
  }, [label])

  const toCapitalCase = (str) => {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  return (
    <div className="checklist-item">
      <strong>
        {toCapitalCase(label)}:{" "}
        {value && <img src={Tick} className="checklist-img" alt="tick" />}
      </strong>

      <div className={className}>
        {value ? (
          <>
            {showMore ? (
              <p>{value}</p>
            ) : (
              <p>{value.length > 50 ? value.slice(0, 50) + " . . ." : value}</p>
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
