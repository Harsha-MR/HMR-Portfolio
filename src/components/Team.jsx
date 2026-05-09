import { motion } from "framer-motion";
import "./Team.css";

const FRIENDS = [
  {
    name: "Kshitij K",
    img: "./kshitij.jpeg",
    role: "Software Developer",
    link: "https://www.linkedin.com/in/kshitij-k-895783239/",
    intro: `Building scalable software solutions with clean architecture, efficient code, and a passion for innovation.`
  },
  {
    name: "D Amogha Hande",
    img: "./prapti.jpg",
    role: "Data Scientist",
    link: "#",
    intro: `Transforming complex data into meaningful insights through analytics, machine learning, and intelligent decision-making.`
  },
  {
    name: "Rahul S Srivastava",
    img: "./bhavya.jpg",
    role: "Software Developer",
    link: "#",
    intro: `Developing reliable and user-focused applications that combine performance, creativity, and modern technologies.`
  },
  {
    name: "Nishanth M",
    img: "./prapti.jpg",
    role: "Software Developer",
    link: "#",
    intro: `Passionate about crafting seamless digital experiences with optimized code and problem-solving driven development.`
  }
];


export function Team() {
  return (
    <section id="team" className="team-section">
      <motion.h2
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="team-title"
      >
        My <span className="grad">Creative Companions</span>
      </motion.h2>

      <div className="team-grid">
        {FRIENDS.map((f, i) => (
          <motion.div
            key={i}
            className="team-card"
            initial={{ opacity: 0, scale: 0.7 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
            >
            <img src={f.img} className="team-photo" />

            <div className="team-info">
                <h3 className="team-name">{f.name}</h3>
                <p className="team-role">{f.role}</p>
                <p className="team-intro">{f.intro}</p>

                <motion.a
                href={f.link}
                target="_blank"
                whileHover={{ scale: 1.1 }}
                className="team-link"
                >
                Visit Profile →
                </motion.a>
            </div>
        </motion.div>

        ))}
      </div>
    </section>
  );
}
