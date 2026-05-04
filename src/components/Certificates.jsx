import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./Certificates.css";

const CERTS = {
  tech: [
      {
    title: "IEEE Research Paper Publication",
    org: "IEEE ",
    date: "2023",
    img: "/certs/IEEE.png"
  },
    {
      title: "NPTEL Certification",
      org: "NPTEL (IIT)",
      date: "2023",
      img: "/certs/NPTEL.png",
    },
    {
  title: "Artificial Intelligence Fundamentals",
  org: "IBM SkillsBuild",
  date: "2025",
  img: "/certs/IBM_AI.png"
},
{
  title: "Agile Scrum Certification",
  org: "Infosys Springboard",
  date: "2024",
  img: "/certs/agile_scrum.png"
},
{
  title: "Architecting Cloud Computing Solutions on Microsoft Azure",
  org: "Infosys Springboard",
  date: "2025",
  img: "/certs/azure_cloud.png"
},
{
  title: "Machine Learning Foundation Certification",
  org: "Infosys Springboard",
  date: "2025",
  img: "/certs/ml_foundation.png"
}
  ],
  // other: [
  //   {
  //     title: "Codathon",
  //     org: "SCET Tech Fest",
  //     date: "2025",
  //     img: "/certs/codathon.png",
  //   },
  //   {
  //     title: "Bugbuzz",
  //     org: "SCET Tech Fest",
  //     date: "2025",
  //     img: "/certs/bugbuzz.png",
  //   },
  //   {
  //     title: "Dataloom",
  //     org: "SCET",
  //     date: "2024",
  //     img: "/certs/dataloom.png",
  //   },
  // ],
};

export default function Certificates() {
  const [tab, setTab] = useState("tech");
  const [selectedCert, setSelectedCert] = useState(null);

  return (
    <section id="certificates" className="cert-section">
      {/* SECTION ENTERS WHEN SCROLLED TO */}
      <motion.div
        className="cert-wrapper"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-20% 0px" }} // triggers closer to when you reach it
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        {/* TITLE */}
        <h2 className="cert-title">
          <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Certificates
          </span>
        </h2>
        <p className="cert-subtitle">
          Explore my achievements — both technical & beyond.
        </p>

        {/* TABS */}
        <div className="cert-tabs">
          {["tech",].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`cert-tab ${tab === t ? "active" : ""}`}
            >
              {t === "tech" ? "Technical" : "Other"}
            </button>
          ))}
        </div>

        {/* GRID */}
        <div className="certs-grid">
          {CERTS[tab].map((c, i) => (
            <motion.div
              key={c.title}
              className="cert-card"
              style={{ ["--angle"]: `${Math.random() * 8 - 4}deg` }}
              initial={{ opacity: 0, y: 40, rotate: -4 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }} // each card animates when it comes in view
              transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
              onClick={() => setSelectedCert(c)}
            >
              <img src={c.img} alt={c.title} className="cert-img" />
              <strong>{c.title}</strong>
              <span className="cert-meta">
                {c.org} • {c.date}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* MODAL PREVIEW */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            className="cert-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCert(null)}
          >
            <motion.img
              className="modal-img"
              src={selectedCert.img}
              initial={{ scale: 0.85 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.85 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
