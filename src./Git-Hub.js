import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./index.css";
import GitHub from "./GitHub"; // Import GitHub profile page

function Home() {
  return (
    <div className="container">
      <div className="card">
        <h1>Hello, I am Krish Singh</h1>
        <p>Welcome to my Git-Hub Profile🎨✨</p>
        <Link to="/github">
          <button className="btn">Explore More</button>
        </Link>
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/github" element={<GitHub />} />
    </Routes>
  </Router>
);
