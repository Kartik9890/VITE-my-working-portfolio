import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./Home.css";
import profileImg from "../assets/kartikGitPic.png";

const roles = [
  "A Frontend Developer",
  "Java Enthusiast",
  "Problem Solver",
  "UI/UX Learner",
];

function Home({ openContactPopup }) {
  const [currentText, setCurrentText] = useState("");
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  useEffect(() => {
    if (subIndex === roles[index].length + 1 && !deleting) {
      const timeout = setTimeout(() => setDeleting(true), 1000);
      return () => clearTimeout(timeout);
    }

    if (subIndex === 0 && deleting) {
      setDeleting(false);
      setIndex((prev) => (prev + 1) % roles.length);
      return;
    }

    const timeout = setTimeout(
      () => {
        setSubIndex((prev) => (deleting ? prev - 1 : prev + 1));
      },
      deleting ? 50 : 100
    );

    return () => clearTimeout(timeout);
  }, [subIndex, deleting, index]);

  useEffect(() => {
    setCurrentText(roles[index].substring(0, subIndex));
  }, [subIndex, index]);

  return (
    <section className="home-container">
      <div className="hero">
        <div className="hero-left" data-aos="fade-right">
          <img src={profileImg} alt="Profile" className="profile-img" />
        </div>

        <div className="hero-right" data-aos="fade-left">
          <h1>Hi, I'm KartiK 👋</h1>
          <h2>
            <span className="typewriter">{currentText}</span>
            <span className="cursor">|</span>
          </h2>
          <p>I love building clean and functional web interfaces.</p>

          <div className="home-buttons">
            <a href="/VITE-my-working-portfolio/projects" className="btn">
              View Projects
            </a>
            <button className="btn outline" onClick={openContactPopup}>
              Contact Me
            </button>
            <a
              href={`${import.meta.env.BASE_URL}resume.pdf`}
              download
              className="btn download"
              rel="noopener noreferrer"
              target="_blank"
            >
              📄 Download Resume
            </a>
          </div>
        </div>
      </div>

      <div className="skills" data-aos="fade-up">
        <h3>Tech Stack</h3>
        <div className="tech-icons">
          <i className="devicon-react-original colored" title="React"></i>
          <i className="devicon-java-plain colored" title="Java"></i>
          <i
            className="devicon-javascript-plain colored"
            title="JavaScript"
          ></i>
          <i className="devicon-html5-plain colored" title="HTML5"></i>
          <i className="devicon-css3-plain colored" title="CSS3"></i>
          <i className="devicon-git-plain colored" title="Git"></i>
          <i className="devicon-github-original colored" title="GitHub"></i>
        </div>
      </div>
    </section>
  );
}

export default Home;
