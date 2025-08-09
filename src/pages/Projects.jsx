import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "./Projects.css";

function Projects() {
  const [repos, setRepos] = useState([]);
  const [error, setError] = useState("");

  const username = "Kartik9890"; // <-- Apna GitHub username

  useEffect(() => {
    fetch(`https://api.github.com/users/${username}/repos?per_page=100`)
      .then((res) => {
        if (!res.ok) {
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
        console.error(err);
        setError(
          "⚠ Unable to load projects from GitHub. Please try again later."
        );
      });
  }, []);

  return (
    <section className="projects-section">
      <h1>🚀 Projects</h1>
      <p className="projects-intro">
        Explore all my open-source projects from GitHub.
      </p>

      {error && <p className="error-text">{error}</p>}

      <div className="projects-grid">
        {repos.map((repo, index) => (
          <motion.div
            key={repo.id}
            className="project-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
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
        {repos.length === 0 && !error && <p>Loading projects...</p>}
      </div>
    </section>
  );
}

export default Projects;
