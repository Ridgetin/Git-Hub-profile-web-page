import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaGithub, FaCode, FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./GitHub.css";

const GitHub = () => {
  const username = "Ridgetin"; 
  const [profile, setProfile] = useState(null);
  const [repos, setRepos] = useState([]);
  
  // Use token from environment variables
  const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

  useEffect(() => {
    const headers = GITHUB_TOKEN ? { Authorization: `token ${GITHUB_TOKEN}` } : {};

    // Fetch GitHub profile data
    axios.get(`https://api.github.com/users/${username}`, { headers })
      .then((res) => setProfile(res.data))
      .catch((err) => console.error("Error fetching profile:", err));

    // Fetch repositories
    axios.get(`https://api.github.com/users/${username}/repos?sort=updated`, { headers })
      .then((res) => setRepos(res.data.slice(0, 4))) 
      .catch((err) => console.error("Error fetching repos:", err));
  }, [GITHUB_TOKEN]);

  return (
    <div className="github-container">
      {profile ? (
        <div className="profile-card">
          <img src={profile.avatar_url} alt="GitHub Avatar" className="avatar" />
          <h1>{profile.name || "Krish Singh (Ridgetin)"}</h1>
          <p>{profile.bio || "No bio available"}</p>
          <a href={profile.html_url} target="_blank" rel="noopener noreferrer" className="github-btn">
            <FaGithub /> Visit GitHub
          </a>
        </div>
      ) : (
        <p>Loading profile...</p>
      )}

      <h2 className="section-title">Top Repositories</h2>
      <div className="repo-list">
        {repos.length > 0 ? (
          repos.map((repo) => (
            <div key={repo.id} className="repo-card">
              <h3>{repo.name}</h3>
              <p>{repo.description || "No description available"}</p>
              <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="repo-btn">
                <FaCode /> View Code
              </a>
            </div>
          ))
        ) : (
          <p>Loading repositories...</p>
        )}
      </div>

      <Link to="/" className="back-btn"><FaArrowLeft /> Back to Home</Link>
    </div>
  );
};

export default GitHub;
