import React, { useEffect, useState, useMemo } from "react";
import "../css/Dashboard.css";
import { Link } from "react-router-dom";
import dashboardImg from "../assets/dashboard-img.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faX } from "@fortawesome/free-solid-svg-icons";

function Dashboard() {
  const [dbData, setDbData] = useState([]);
  const [clickDb, setClickDb] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    async function fetchResumeTexts() {
      try {
        const response = await fetch(`${process.env.REACT_APP_SERVER}/resume-reports`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const responseData = await response.json();
        setDbData(responseData);
      } catch (error) {
        console.error("There was a problem fetching the resume texts:", error);
      }
    }

    fetchResumeTexts();
  }, [token]);

  const handleDatabase = () => {
    setClickDb(!clickDb);
  };

  const handleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const parsedData = useMemo(() => {
    if (dbData.length === 0) return [];

    return dbData.map((item) => {
      const parsedText = JSON.parse(item.text);
      return {
        ...item,
        name: parsedText.checkList.name || "N/A",
        jobRole: parsedText.checkList.jobRole || "N/A",
        email: parsedText.checkList.email || "N/A",
        number: parsedText.checkList.number || "N/A",
        linkedIn: parsedText.checkList.linkedIn || "N/A",
        portfolio: parsedText.checkList.portfolio || "N/A",
      };
    });
  }, [dbData]);

  return (
    <div className="dashboard-section">
      <aside
        className={`dashboard-head slide-right ${menuOpen ? "close" : ""}`}
      >
        <div className="dashboard-menu">
          <p onClick={handleDatabase}>
            {!clickDb ? "User Database" : "Dashboard"}
          </p>
        </div>
        <Link to="/login">
          <button className="log-out-btn btn">Log out</button>
        </Link>
      </aside>
      <aside className="dashboard-body">
        <FontAwesomeIcon
          icon={menuOpen ? faX : faBars}
          className="hamburger-menu slide-right"
          onClick={handleMenu}
        />
        {!clickDb ? (
          <>
            <h1 className="slide-bottom">Welcome to the career desire dashboard</h1>
            {dbData.length > 0 ? (
              <h2 className="total-users slide-bottom">
                Total users {dbData.length}
              </h2>
            ) : null}
            <img
              src={dashboardImg}
              alt="dashboardImg"
              className="slide-bottom dashboard-img"
            />
          </>
        ) : (
          <section className="db-section">
            <h1>User Database</h1>
            {parsedData.length > 0 ? (
              <table className="db-table">
                <thead>
                  <tr>
                    <th>S.No</th>
                    <th>Name</th>
                    <th>Job Role</th>
                    <th>Email</th>
                    <th>Mobile</th>
                    <th>LinkedIn</th>
                    <th>Portfolio</th>
                    <th>Created At</th>
                  </tr>
                </thead>
                <tbody>
                  {parsedData.map((item, index) => (
                    <tr key={item._id}>
                      <td>{index + 1}</td>
                      <td>{item.name}</td>
                      <td>{item.jobRole}</td>
                      <td>{item.email}</td>
                      <td>{item.number}</td>
                      <td>{item.linkedIn}</td>
                      <td>{item.portfolio}</td>
                      <td>{new Date(item.createdAt).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No data available.</p>
            )}
          </section>
        )}
      </aside>
    </div>
  );
}

export default Dashboard;