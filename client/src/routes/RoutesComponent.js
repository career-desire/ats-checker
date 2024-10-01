import React from "react";
import Hero from "../layout/Hero";
import Report from "../layout/Report";
import Loader from "../components/Loader";
import Register from "../layout/Register";
import Login from "../layout/Login";
import Alert from "@mui/material/Alert";
import NavBar from "../layout/NavBar";
import { Route, Routes } from "react-router-dom";
import Dashboard from "../layout/Dashboard";

function RoutesComponent({
  success,
  error,
  setError,
  handleError,
  handleSuccess,
  token,
  isDark,
  setIsDark,
  LoaderReport,
  setLoaderReport,
  loading,
  setLoading,
  handleLogin,
}) {
  return (
    <div>
      {success && (
        <Alert
          variant="filled"
          severity="success"
          className="alert-box"
          id="bounce-in-top"
        >
          {success} {/* Display success message */}
        </Alert>
      )}
      {error && (
        <Alert
          variant="filled"
          severity="error"
          className="alert-box"
          id="bounce-in-top"
        >
          {error} {/* Display error message */}
        </Alert>
      )}
      <NavBar handleSuccess={handleSuccess} isDark={isDark} setIsDark={setIsDark} />
      <Routes>
        <Route
          path="/"
          element={
            <Hero
              handleError={handleError}
              token={token}
              isDark={isDark}
              setLoaderReport={setLoaderReport}
              handleSuccess={handleSuccess}
              setLoading={setLoading}
              error={error}
            />
          }
        />
        <Route
          path="/report"
          element={<Report token={token} isDark={isDark} />}
        />
        <Route
          path="/loader"
          element={<Loader loading={loading} LoaderReport={LoaderReport} />}
        />
        <Route
          path="/dashboard"
          element={<Dashboard token={token} isDark={isDark} />}
        />
        <Route
          path="/register"
          element={<Register handleSuccess={handleSuccess} setError={setError} />}
        />
        <Route path="/login" element={<Login handleLogin={handleLogin} handleSuccess={handleSuccess}/>} />
      </Routes>
    </div>
  );
}

export default RoutesComponent;