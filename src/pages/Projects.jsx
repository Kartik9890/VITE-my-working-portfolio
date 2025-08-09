import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "./Projects.css";

function Projects() {
  const [repos, setRepos] = useState([]);
  const [error, setError] = useState("");

  const username = "Kartik9890"; // your GitHub username

  useEffect(() => {
    const token = import.meta.env.VITE_GITHUB_TOKEN; // optional
    const headers = token ? { Authorization: `token ${token}` } : {};

    fetch(`https://api.github.com/users/${username}/repos?per_page=100`, {
      headers,
    })
      .then((res) => {
        if (!res.ok) {
          // if rate-limited or blocked
          throw new Error(`GitHub API Error: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        const filtered = data
          .filter((repo) => !repo.fork)
          .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
        setRepos(filtered);
      })
      .catch((err) => {
        console.error("Projects fetch error:", err);
        setError(
          "⚠ Unable to load projects from GitHub (rate limit or network). Click below to view all projects on GitHub."
        );
      });
  }, []);

  return (
    <section className="projects-section">
      <h1>🚀 Projects</h1>
      <p className="projects-intro">
        Explore my open-source projects on GitHub.
      </p>

      {error && (
        <div className="error-block">
          <p className="error-text">{error}</p>
          <a
            href={`https://github.com/${username}?tab=repositories`}
            target="_blank"
            rel="noreferrer"
            className="btn outline"
          >
            View all projects on GitHub
          </a>
        </div>
      )}

      <div className="projects-grid">
        {repos.map((repo, index) => (
          <motion.div
            key={repo.id}
            className="project-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.06, duration: 0.45 }}
          >
            <h2>{repo.name}</h2>
            <p className="description">
              {repo.description || "No description provided."}
            </p>
            <div className="project-meta">
              <span>⭐ {repo.stargazers_count}</span>
              <span>🛠 {repo.language || "Unknown"}</span>
              <span>📅 {new Date(repo.updated_at).toLocaleDateString()}</span>
            </div>
            <div className="project-links">
              <a
                href={repo.html_url}
                target="_blank"
                rel="noreferrer"
                className="btn"
              >
                GitHub
              </a>
              {repo.homepage && (
                <a
                  href={repo.homepage}
                  target="_blank"
                  rel="noreferrer"
                  className="btn outline"
                >
                  Live Demo
                </a>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* fallback when no repos and no error */}
      {repos.length === 0 && !error && <p>Loading projects...</p>}
    </section>
  );
}

export default Projects;
