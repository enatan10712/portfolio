"use client";

import { motion } from "framer-motion";
import SkillBadge from "@/components/SkillBadge";

const skillCategories = {
  Programming: [
    { name: "Python", description: "Production ML pipelines & ETL" },
    { name: "JavaScript/TypeScript", description: "Full-stack web development" },
    { name: "SQL", description: "Complex queries & optimization" },
    { name: "Bash/Shell", description: "Automation & scripting" },
  ],
  "ML/AI": [
    { name: "Scikit-learn", description: "Classical ML algorithms" },
    { name: "TensorFlow", description: "Deep learning models" },
    { name: "PyTorch", description: "Research & experimentation" },
    { name: "XGBoost/LightGBM", description: "Gradient boosting" },
    { name: "Pandas/NumPy", description: "Data manipulation" },
    { name: "MLflow", description: "Experiment tracking" },
  ],
  Cybersecurity: [
    { name: "Burp Suite", description: "Web app security testing" },
    { name: "Metasploit", description: "Penetration testing" },
    { name: "Nmap/Nessus", description: "Network scanning" },
    { name: "OWASP Top 10", description: "Web vulnerabilities" },
    { name: "Wireshark", description: "Network analysis" },
  ],
  DevOps: [
    { name: "Docker", description: "Containerization" },
    { name: "Kubernetes", description: "Container orchestration" },
    { name: "Git/GitHub", description: "Version control" },
    { name: "CI/CD", description: "Automated pipelines" },
    { name: "Linux", description: "Server administration" },
  ],
  "Data Tools": [
    { name: "PostgreSQL", description: "Relational databases" },
    { name: "MongoDB", description: "NoSQL databases" },
    { name: "Redis", description: "Caching & queues" },
    { name: "Kafka", description: "Stream processing" },
    { name: "Streamlit/Gradio", description: "Interactive dashboards" },
  ],
};

export default function SkillsPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="section pt-32 pb-12 bg-light-surface dark:bg-dark-surface/50">
        <div className="container-custom text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-light-text dark:text-dark-text mb-4"
          >
            Skills & Technologies
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-light-text-secondary dark:text-dark-text-secondary max-w-2xl mx-auto"
          >
            A comprehensive overview of my technical stack, organized by domain.
            Each skill is battle-tested in production environments.
          </motion.p>
        </div>
      </section>

      {/* Skills Grid */}
      <section className="section">
        <div className="container-custom space-y-16">
          {Object.entries(skillCategories).map(([category, skills]) => (
            <div key={category}>
              <h2 className="text-2xl md:text-3xl font-bold text-light-text dark:text-dark-text mb-6">
                {category}
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {skills.map((skill, index) => (
                  <SkillBadge
                    key={skill.name}
                    name={skill.name}
                    category={category}
                    description={skill.description}
                    index={index}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Certifications */}
      <section className="section bg-light-surface dark:bg-dark-surface/50">
        <div className="container-custom">
          <h2 className="text-2xl md:text-3xl font-bold text-light-text dark:text-dark-text mb-8 text-center">
            Certifications & Training
          </h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {[
              "EC-Council Ethical Hacking Essentials (EHE)",
              "Android Bug Bounty Hunting Certification (ID #294458)",
              "Security Blue Team OSINT Analyst (ID #520813553)",
              "Simplilearn SQL Certification Course (#9191317)",
              "Simplilearn Programming Essentials (#9040069)",
              "Python for Data Science (Udemy, UC-68243772)",
              "INSA Cyber Talent Summer Camp Graduate",
              "Information Security Fundamentals (Udemy, UC-d76c3f04)",
              "CSS/Bootstrap + Python Stack (Udemy, UC-b7567d76)",
              "Ethical Hacking Zero to Hero (Udemy, UC-f8fd45ef)",
              "IP Addressing & Subnetting (Udemy, UC-33ca777e)",
            ].map((cert, index) => (
              <motion.div
                key={cert}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="card p-6 flex items-center gap-4"
              >
                <svg
                  className="w-8 h-8 text-accent flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                  />
                </svg>
                <span className="text-light-text dark:text-dark-text font-medium">
                  {cert}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
