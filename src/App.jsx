// Import necessary modules and components
import "./style/Animation.css"
import NavBar from "./layout/NavBar.jsx"
import Home from "./pages/Home.jsx"
import Report from "./pages/Report.jsx"
import Login from "./pages/Login.jsx"
import Register from "./pages/Register.jsx"
import { Route, Routes } from "react-router-dom";

// Main component for the app
function App() {

  return (
    <div>
      <NavBar />
      <Routes>
        <Route
          path="/"
          element={<Home />}
        />
        <Route
          path="/report"
          element={<Report />}
        />
        {/* <Route
          path="/dashboard"
          element={<Dashboard isDark={isDark} />}
        /> */}
        <Route
          path="/register"
          element={<Register />}
        />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;