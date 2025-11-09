"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const timeline = [
  {
    year: "2025",
    title: "📊 Data Scientist",
    company: "Current",
    description: "✨ Started August 18, 2025. Building ML models, cleaning large datasets, creating reliable systems that scale.",
  },
  {
    year: "2020",
    title: "🔐 Web Pentester",
    company: "Self-Taught / COVID Era",
    description: "🦠 Started during COVID lockdown. Testing websites for security problems, helping teams fix vulnerabilities.",
  },
  {
    year: "Ongoing",
    title: "💻 Developer",
    company: "Full Stack",
    description: "🛠️ Building reliable and scalable web applications with secure coding practices.",
  },
  {
    year: "Oct 2025",
    title: "🧠 SQL Certification Milestone",
    company: "Simplilearn",
    description: "📜 Completed the SQL Certification Course (Code #9191317), mastering analytics-grade querying and reporting.",
  },
  {
    year: "Oct 2025",
    title: "🐍 Python for Data Science",
    company: "Udemy · Meritshot Academy",
    description: "🤖 Finished the Python for Data Science with Assignments program (UC-68243772), shipping data pipelines and ML experiments.",
  },
  {
    year: "Sep 2025",
    title: "🛠️ Programming Essentials",
    company: "Simplilearn",
    description: "✅ Passed the Programming Essentials training (Code #9040069) with a delivered capstone project.",
  },
  {
    year: "Feb 2024",
    title: "🔎 OSINT & Bug Bounty Focus",
    company: "Security Blue Team & EC-Council",
    description: "🧭 Earned Introduction to OSINT (ID #520813553) and Android Bug Bounty Hunting (Cert #294458) to deepen offensive security skills.",
  },
  {
    year: "Jan 2023",
    title: "🎓 Ethical Hacking Essentials",
    company: "EC-Council",
    description: "🛡️ Achieved the Ethical Hacking Essentials certificate (#188212), formalizing core cyber defense and attack methodologies.",
  },
  {
    year: "Dec 2022",
    title: "🔐 Cyber Talent Summer Camp",
    company: "INSA x AASTU",
    description: "🏆 Completed Cyber Talent Summer Camp participation with hands-on labs in vulnerability analysis.",
  },
  {
    year: "Dec 2022",
    title: "🛡️ Security Fundamentals Sprint",
    company: "Udemy InfoSec",
    description: "📘 Finished Information Security Fundamentals (UC-c3e0bfcc), covering threat models and governance basics.",
  },
  {
    year: "Dec 2022",
    title: "🧩 Full Stack Foundations",
    company: "Udemy · Proper Dot Institute",
    description: "🌐 Wrapped CSS, Bootstrap, JavaScript & Python Stack course (UC-b7567d76) to bolster front-end and API workflows.",
  },
  {
    year: "Dec 2022",
    title: "🌐 Networking Essentials",
    company: "Udemy · Cyber Quince",
    description: "🛰️ Completed IP Addressing & Subnetting Zero to Hero (UC-33ca777e) to strengthen network design and routing skills.",
  },
  {
    year: "Dec 2022",
    title: "🎨 Creative Production",
    company: "Udemy · Stephen Koel Soren",
    description: "🎬 Earned Complete Graphics Design & Video Editing Masterclass credential (UC-d76c3f04) for content storytelling.",
  },
  {
    year: "Dec 2022",
    title: "🕵️ Offensive Mastery",
    company: "Udemy · MMZ Academy",
    description: "⚔️ Completed Ultimate Ethical Hacking Zero to Hero (UC-f8fd45ef) with advanced exploit practice.",
  },
];

const certificates = [
  {
    name: "SQL Certification Course",
    issuer: "Simplilearn",
    date: "17 Oct 2025",
    icon: "🧠",
    color: "text-orange-500",
    image: "/certificates/simplilearn-sql.jpg",
    description: "Certificate of Achievement - Code #9191317",
    categories: ["Data", "SQL", "Certification"],
  },
  {
    name: "Python for Data Science with Assignments",
    issuer: "Udemy (Meritshot Academy)",
    date: "01 Oct 2025",
    icon: "🐍",
    color: "text-emerald-500",
    image: "/certificates/udemy-python-data-science.jpg",
    description: "Certificate of Completion - UC-68243772-eaa0-40e3-8b91-ace6de936fb66 (9.5 hours)",
    categories: ["Data", "Python", "Programming"],
  },
  {
    name: "Programming Essentials",
    issuer: "Simplilearn",
    date: "24 Sep 2025",
    icon: "🛠️",
    color: "text-amber-500",
    image: "/certificates/simplilearn-programming-essential.jpg",
    description: "Certificate of Achievement - Code #9040069 (1 project passed)",
    categories: ["Programming", "Fundamentals"],
  },
  {
    name: "Complete Graphics Design & Video Editing Masterclass",
    issuer: "Udemy (Stephen Koel Soren)",
    date: "11 Dec 2022",
    icon: "🎨",
    color: "text-purple-400",
    image: "/certificates/udemy-graphics-video-masterclass.jpg",
    description: "Certificate of Completion - UC-d76c3f04-648d-458f-99da-a5b10ed65c54 (10 hours)",
    categories: ["Design", "Creative"],
  },
  {
    name: "CSS, Bootstrap & JavaScript + Python Stack",
    issuer: "Udemy (Proper Dot Institute)",
    date: "11 Dec 2022",
    icon: "🧩",
    color: "text-cyan-500",
    image: "/certificates/udemy-css-bootstrap-python.jpg",
    description: "Certificate of Completion - UC-b7567d76-be24-4e48-924a-5249c627b3a6 (7.5 hours)",
    categories: ["Development", "Frontend", "Python"],
  },
  {
    name: "Ultimate Ethical Hacking: Zero to Hero",
    issuer: "Udemy (MMZ Academy)",
    date: "15 Dec 2022",
    icon: "🕵️",
    color: "text-sky-500",
    image: "/certificates/udemy-ethical-hacking-hero.jpg",
    description: "Certificate of Completion - UC-f8fd45ef-14d1-45bc-8dcf-01b22ae65d4a (9.5 hours)",
    categories: ["Security", "Ethical Hacking"],
  },
  {
    name: "Ethical Hacking Essentials (EHE)",
    issuer: "EC-Council (CodeRed)",
    date: "02 Jan 2023",
    icon: "🎓",
    color: "text-red-500",
    image: "/certificates/ec-council-ehe.jpg",
    description: "Certificate of Achievement - Certificate #188212",
    categories: ["Security", "Ethical Hacking"],
  },
  {
    name: "Cyber Talent Summer Camp - Certificate of Participation",
    issuer: "INSA (Information Network Security Administration)",
    date: "December 2022",
    icon: "🔐",
    color: "text-blue-500",
    image: "/certificates/insa-cybersecurity.jpg",
    description: "In collaboration with Addis Ababa Science & Technology University (AASTU)",
    categories: ["Security", "Cybersecurity Training"],
  },
  {
    name: "Information Security Fundamentals",
    issuer: "Udemy InfoSec",
    date: "15 Dec 2022",
    icon: "🛡️",
    color: "text-green-500",
    image: "/certificates/udemy-infosec.jpg",
    description: "Certificate of Completion - UC-c3e0bfcc-6bce-4580-805b-89b9dbbcb277 (1.5 hours)",
    categories: ["Security", "Fundamentals"],
  },
  {
    name: "IP Addressing & Subnetting: Zero to Hero",
    issuer: "Udemy (Cyber Quince)",
    date: "15 Dec 2022",
    icon: "🌐",
    color: "text-indigo-500",
    image: "/certificates/udemy-ip-addressing.jpg",
    description: "Certificate of Completion - UC-33ca777e-e914-466f-9351-1934881a3cb4 (2.5 hours)",
    categories: ["Networking", "Security"],
  },
  {
    name: "Introduction to OSINT",
    issuer: "Security Blue Team (SBT)",
    date: "15 Feb 2024",
    icon: "🔎",
    color: "text-blue-600",
    image: "/certificates/osint-sbt.jpg",
    description: "Certificate of Completion - ID #520813553",
    categories: ["Security", "OSINT"],
  },
  {
    name: "Android Bug Bounty Hunting: Hunt Like a Rat",
    issuer: "EC-Council",
    date: "09 Feb 2024",
    icon: "🐛",
    color: "text-purple-500",
    image: "/certificates/android-bug-bounty.jpg",
    description: "Certificate of Achievement - Certificate #294458",
    categories: ["Security", "Bug Bounty"],
  },
];

export default function AboutPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [timelineIndex, setTimelineIndex] = useState(0);

  const categoryOptions = useMemo(() => {
    const unique = new Set<string>();
    certificates.forEach((cert) => {
      cert.categories?.forEach((category) => unique.add(category));
    });
    return ["All", ...Array.from(unique).sort((a, b) => a.localeCompare(b))];
  }, []);

  const filteredCertificates = useMemo(() => {
    if (selectedCategory === "All") {
      return certificates;
    }
    return certificates.filter((cert) =>
      cert.categories?.includes(selectedCategory)
    );
  }, [selectedCategory]);

  useEffect(() => {
    const autoAdvance = setInterval(() => {
      setTimelineIndex((prev) => (prev + 1) % timeline.length);
    }, 6000);

    return () => clearInterval(autoAdvance);
  }, []);

  const handleTimelinePrev = () => {
    setTimelineIndex((prev) => (prev - 1 + timeline.length) % timeline.length);
  };

  const handleTimelineNext = () => {
    setTimelineIndex((prev) => (prev + 1) % timeline.length);
  };

  const currentTimelineItem = timeline[timelineIndex];

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="section pt-32 pb-12 bg-light-surface dark:bg-dark-surface/50">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold text-light-text dark:text-dark-text mb-6">
                👨‍💻 About Me
              </h1>
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <p className="text-light-text-secondary dark:text-dark-text-secondary leading-relaxed">
                  Hello — I am <span className="text-accent font-semibold">Enatan Dereje</span>. I work as a 
                  <span className="font-semibold">📊 Data Scientist</span>, <span className="font-semibold">🔐 Web Pentester</span>, 
                  and <span className="font-semibold">💻 Developer</span>.
                </p>
                <p className="text-light-text-secondary dark:text-dark-text-secondary leading-relaxed mt-4">
                  I <span className="text-accent">build machine learning models</span>, 
                  <span className="text-accent">clean and analyze large datasets</span>, and 
                  <span className="text-accent">test websites for security problems</span>. 
                  I create <span className="font-semibold">reliable systems that scale</span> 🚀 and help teams 
                  <span className="font-semibold">fix security issues</span> 🛡️.
                </p>
                <p className="text-light-text-secondary dark:text-dark-text-secondary leading-relaxed mt-4">
                  I started learning <span className="font-semibold">🔐 web pentesting</span> during the 
                  <span className="text-accent">COVID lockdown</span> 🦠 and began 
                  <span className="font-semibold">📊 data science</span> on 
                  <span className="text-accent font-semibold">August 18, 2025</span> ✨.
                </p>
              </div>

              <a
                href="/resume.pdf"
                download
                className="btn-primary inline-block mt-8"
              >
                📥 Download Resume 🌟
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="card p-8"
            >
              <h3 className="text-xl font-bold text-light-text dark:text-dark-text mb-4">
                ⚡ Quick Facts
              </h3>
              <ul className="space-y-3">
                {[
                  { label: "🌍 Location", value: "Remote / Ethiopia" },
                  { label: "⏳ Experience", value: "3+ years" },
                  { label: "🎯 Focus Areas", value: "ML, Security, DevOps" },
                  { label: "✨ Availability", value: "Open to opportunities" },
                ].map((fact) => (
                  <li key={fact.label} className="flex justify-between">
                    <span className="text-light-text-secondary dark:text-dark-text-secondary">
                      {fact.label}
                    </span>
                    <span className="font-medium text-light-text dark:text-dark-text">
                      {fact.value}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-light-text dark:text-dark-text mb-12 text-center">
            🚀 Experience Timeline
          </h2>

          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <button
                type="button"
                onClick={handleTimelinePrev}
                className="btn-secondary px-4 py-2"
              >
                ⬆️ Previous
              </button>
              <p className="text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary">
                Entry {timelineIndex + 1} of {timeline.length}
              </p>
              <button
                type="button"
                onClick={handleTimelineNext}
                className="btn-secondary px-4 py-2"
              >
                Next ⬇️
              </button>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={`${currentTimelineItem.year}-${currentTimelineItem.title}`}
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -60 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="card p-8 shadow-lg"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                  <div className="inline-flex items-center gap-3">
                    <div className="w-14 h-14 rounded-full bg-accent flex items-center justify-center text-dark-bg font-bold text-lg">
                      {currentTimelineItem.year.slice(-2)}
                    </div>
                    <div>
                      <p className="text-accent font-semibold">{currentTimelineItem.year}</p>
                      <h3 className="text-2xl font-bold text-light-text dark:text-dark-text">
                        {currentTimelineItem.title}
                      </h3>
                    </div>
                  </div>
                  <span className="text-sm uppercase tracking-wide text-light-text-secondary dark:text-dark-text-secondary">
                    {currentTimelineItem.company}
                  </span>
                </div>

                <p className="text-light-text-secondary dark:text-dark-text-secondary leading-relaxed">
                  {currentTimelineItem.description}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Certificates */}
      <section className="section bg-light-surface dark:bg-dark-surface/50">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-light-text dark:text-dark-text mb-12 text-center">
            🎓 Certifications & Training
          </h2>

          <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
            {categoryOptions.map((category) => {
              const isActive = category === selectedCategory;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all border backdrop-blur flex items-center gap-2 shadow-sm ${
                    isActive
                      ? "bg-accent/90 text-dark-bg border-accent shadow-accent/40"
                      : "bg-light-bg/70 dark:bg-dark-bg/70 text-light-text-secondary dark:text-dark-text-secondary border-light-border dark:border-dark-border hover:border-accent/70 hover:text-accent"
                  }`}
                >
                  {category === "All" ? "🌈 All" : category}
                </button>
              );
            })}
          </div>

          {filteredCertificates.length === 0 ? (
            <p className="text-center text-light-text-secondary dark:text-dark-text-secondary">
              No certifications found for <span className="text-accent font-semibold">{selectedCategory}</span>. Try another category.
            </p>
          ) : (
            <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {filteredCertificates.map((cert, index) => (
                <motion.div
                  key={cert.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="card p-0 overflow-hidden hover:shadow-lg transition-shadow"
                >
                  {/* Certificate Image */}
                  {cert.image && (
                    <div className="relative h-48 bg-gradient-to-br from-light-surface to-light-bg dark:from-dark-surface-hover dark:to-dark-surface border-b border-light-border dark:border-dark-border overflow-hidden group">
                      <Image
                        src={cert.image}
                        alt={cert.name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                  )}

                  {/* Certificate Info */}
                  <div className="p-6">
                    <div className="flex items-start gap-4">
                      <div className={`text-4xl ${cert.color} flex-shrink-0`}>
                        {cert.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-light-text dark:text-dark-text mb-1">
                          {cert.name}
                        </h3>
                        <p className="text-sm text-accent font-medium mb-1">
                          {cert.issuer}
                        </p>
                        {cert.description && (
                          <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary mb-2">
                            {cert.description}
                          </p>
                        )}
                        <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                          📅 {cert.date}
                        </p>

                        {cert.categories && (
                          <div className="flex flex-wrap gap-2 mt-3">
                            {cert.categories.map((category) => (
                              <span
                                key={category}
                                className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-full bg-light-bg/80 dark:bg-dark-surface/70 border border-light-border/70 dark:border-dark-border/70 text-light-text-secondary dark:text-dark-text-secondary"
                              >
                                # {category}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
          <div className="text-center mt-8">
            <p className="text-light-text-secondary dark:text-dark-text-secondary">
              ✨ More certifications coming soon!
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold text-light-text dark:text-dark-text mb-4">
            🤝 Let's Work Together
          </h2>
          <p className="text-light-text-secondary dark:text-dark-text-secondary mb-8 max-w-2xl mx-auto">
            I'm always interested in hearing about new opportunities and collaborations. 💡✨
          </p>
          <Link href="/contact" className="btn-primary inline-block">
            📬 Get in Touch
          </Link>
        </div>
      </section>
    </div>
  );
}
