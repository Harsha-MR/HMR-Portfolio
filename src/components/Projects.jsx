import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";
import "./projects.css";

const PROJECTS = [
  {
    title: "🛡️ Intelligent SQL Injection Detection System",
    desc: "Hybrid CNN and rule-based system to detect malicious SQL queries with high accuracy, combining deep learning and pattern-based filtering.",
    ss: "/SQLi.png",
    tech: ["Python", "TensorFlow", "CNN", "Cybersecurity"],
    live: "#",
    code: "#",
  },
  {
    title: "🏭 Smart Factory Digital Twin & Production Planner",
    desc: "3D visualization platform for factory environments with real-time production planning, machine tracking, and operational insights.",
    ss: "/digitalTwin.png",
    tech: ["React", "Three.js", "Node.js", "MongoDB"],
    live: "#",
    code: "#",
  },
  {
    title: "💼 Developer Portfolio Website",
    desc: "Modern responsive portfolio showcasing projects, certifications, and skills with smooth UI and interactive design.",
    ss: "/portfolio.jpg",
    tech: ["React", "Framer Motion", "CSS"],
    live: "#",
    code: "#",
  },
  {
    title: "🌦️ Weather Analytics Dashboard",
    desc: "Interactive dashboard for analyzing weather data with real-time updates, visual insights, and trend forecasting.",
    ss: "/weather.png",
    tech: ["React", "API Integration", "Chart.js"],
    live: "#",
    code: "#",
  },
  {
    title: "🚌 Online Bus Ticket Booking System",
    desc: "Full-stack web application for booking and managing bus tickets with seat selection, scheduling, and user authentication.",
    ss: "/bus.png",
    tech: ["React", "Node.js", "Express", "MongoDB"],
    live: "#",
    code: "#",
  },
  {
    title: "📋 Task Distribution System with RBAC",
    desc: "Role-based task management system with admin-agent workflow, CSV upload, and automated task allocation.",
    ss: "/taskDistributor.png",
    tech: ["React", "Node.js", "Express", "MongoDB", "JWT"],
    live: "#",
    code: "#",
  }
]

export default function Projects() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: "-20% 0px" });

  return (
    <motion.section
      ref={sectionRef}
      className="projects-container"
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      id="projects"
    >
      <motion.div
        className="projects-card"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.18 } },
        }}
      >
        {/* Title Animation */}
        <motion.h2
                  initial={{ x: -200, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  className="projects-title"
                >
          🚀My <span className="proj">Projects</span>
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          className="projects-subtitle"
          variants={{
            hidden: { opacity: 0, y: 10 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
          }}
        >
          A collection of my major works — blending research, AI innovation.
        </motion.p>

        {/* Grid */}
        <div className="projects-grid">
          {PROJECTS.map((p, idx) => (
            <motion.div
              key={idx}
              className="project-card"
              variants={{
                hidden: { opacity: 0, y: 40, scale: 0.9 },
                visible: {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: {
                    duration: 0.45,
                    ease: "easeOut",
                    delay: idx * 0.1,
                  },
                },
              }}
              whileHover={{ scale: 1.04 }}
            >
              <motion.div
                className="project-image-wrapper"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <img src={p.ss} alt={p.title} className="project-image" />
              </motion.div>

              <div className="project-content">
                <h3 className="project-heading">{p.title}</h3>
                <p className="project-desc">{p.desc}</p>

                <div className="project-tech">
                  {p.tech.map((t) => (
                    <span key={t} className="tech-badge">
                      {t}
                    </span>
                  ))}
                </div>

                {/* <div className="project-links">
                  <motion.a
                    href={p.code}
                    target="_blank"
                    whileHover={{ scale: 1.08 }}
                    className="code-btn"
                  >
                    <Github size={14} /> Code
                  </motion.a>

                  <motion.a
                    href={p.live}
                    target="_blank"
                    whileHover={{ scale: 1.08 }}
                    className="live-btn"
                  >
                    <ExternalLink size={14} /> Live
                  </motion.a>
                </div> */}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.section>
  );
}
