import { useEffect, useState } from 'react';
import { motion } from 'framer-motion'; // NEW
import './Projects.css';

function Projects() {
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    fetch('https://api.github.com/users/Kartik9890/repos?per_page=100')
      .then((res) => res.json())
      .then((data) => {
        const filtered = data
          .filter(repo => !repo.fork)
          .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
        setRepos(filtered);
      })
      .catch(console.error);
  }, []);

  return (
    <section className="projects-section">
      <h1>🚀 Projects</h1>
      <p className="projects-intro">Explore all my open-source projects from GitHub.</p>

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
            <p className="description">{repo.description || "No description provided."}</p>
            <div className="project-meta">
              <span>⭐ {repo.stargazers_count}</span>
              <span>🛠 {repo.language || 'Unknown'}</span>
              <span>📅 {new Date(repo.updated_at).toLocaleDateString()}</span>
            </div>
            <div className="project-links">
              <a href={repo.html_url} target="_blank" rel="noreferrer" className="btn">GitHub</a>
              {repo.homepage && (
                <a href={repo.homepage} target="_blank" rel="noreferrer" className="btn outline">Live Demo</a>
              )}
            </div>
          </motion.div>
        ))}
        {repos.length === 0 && <p>Loading projects...</p>}
      </div>
    </section>
  );
}

export default Projects;
