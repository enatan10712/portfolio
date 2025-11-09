"use client";

import { motion } from "framer-motion";
import CTAButtons from "@/components/CTAButtons";
import InteractiveTerminal from "@/components/InteractiveTerminal";
import ProjectCard from "@/components/ProjectCard";
import TypingEffect from "@/components/TypingEffect";
import AnimatedCounter from "@/components/AnimatedCounter";
import GlitchText from "@/components/GlitchText";
import Link from "next/link";

// Import projects from JSON - add your own projects to data/projects.json
import projectsData from "@/data/projects.json";

const featuredProjects = projectsData.filter((p: any) => p.featured).slice(0, 3);

const stats = [
  { label: "Years Experience", value: 3, suffix: "+" },
  { label: "Projects Completed", value: projectsData.length, suffix: "+" },
  { label: "Technologies", value: 20, suffix: "+" },
];

const roles = [
  "Data Scientist",
  "Web Pentester",
  "Full Stack Developer",
  "ML Engineer",
  "Security Researcher",
];

const heroHighlights = [
  "📊 Building ML models.",
  "🧹 Cleaning large datasets.",
  "🔐 Testing websites for security.",
  "🚀 Creating reliable systems that scale.",
];

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="section pt-32 pb-16 ambient-bg">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-block mb-4"
              >
                <span className="badge shimmer">
                  ✨ Available for opportunities
                </span>
              </motion.div>

              <h1 className="text-5xl md:text-6xl font-bold mb-4">
                <span className="text-gradient">Enatan Dereje</span>
              </h1>

              <h2 className="text-2xl md:text-3xl font-semibold text-light-text-secondary dark:text-dark-text-secondary mb-6">
                <TypingEffect texts={roles} className="text-accent" />
              </h2>

              <motion.ul
                className="text-lg text-light-text-secondary dark:text-dark-text-secondary mb-8 max-w-2xl flex flex-col sm:flex-row sm:flex-wrap gap-3"
                role="list"
              >
                {heroHighlights.map((item, index) => (
                  <motion.li
                    key={item}
                    role="listitem"
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + index * 0.08, duration: 0.25 }}
                    whileHover={{ scale: 1.03 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-light-border/60 dark:border-dark-border/60 bg-gradient-to-br from-light-bg/85 via-light-bg/70 to-light-bg/60 dark:from-dark-surface/80 dark:via-dark-surface/60 dark:to-dark-surface/50 shadow-sm backdrop-blur-sm hover:shadow-lg transition-all"
                  >
                    {item}
                  </motion.li>
                ))}
              </motion.ul>

              <CTAButtons />

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 mt-12">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                  >
                    <div className="text-3xl font-bold text-accent mb-2 pulse-glow">
                      <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                    </div>
                    <div className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right: Visual Element */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-4"
            >
              {/* Interactive Terminal */}
              <InteractiveTerminal />

              {/* Abstract SVG or Stats Cards */}
              <div className="grid grid-cols-2 gap-4">
                <div className="card p-6">
                  <div className="text-accent text-2xl mb-2">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-light-text dark:text-dark-text mb-1">
                    Data Science
                  </h3>
                  <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary">
                    ML pipelines & ETL
                  </p>
                </div>

                <div className="card p-6">
                  <div className="text-accent text-2xl mb-2">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-light-text dark:text-dark-text mb-1">
                    Security
                  </h3>
                  <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary">
                    Web pentesting
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="section bg-light-surface dark:bg-dark-surface/50">
        <div className="container-custom">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-light-text dark:text-dark-text mb-2">
                Featured Projects
              </h2>
              <p className="text-light-text-secondary dark:text-dark-text-secondary">
                Selected work demonstrating impact and technical depth
              </p>
            </div>
            <Link
              href="/projects"
              className="btn-ghost hidden md:inline-flex"
            >
              View All →
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.slug} {...project} />
            ))}
          </div>

          <div className="text-center mt-8 md:hidden">
            <Link href="/projects" className="btn-primary inline-block">
              View All Projects
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Skills Overview */}
      <section className="section">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-light-text dark:text-dark-text mb-12">
            Technical Expertise
          </h2>

          <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {["Python", "Machine Learning", "Cybersecurity", "DevOps"].map((skill, index) => (
              <motion.div
                key={skill}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center card-hover p-4"
              >
                <h3 className="font-semibold text-light-text dark:text-dark-text">
                  {skill}
                </h3>
              </motion.div>
            ))}
          </div>

          <Link href="/skills" className="btn-secondary inline-block mt-8">
            View All Skills
          </Link>
        </div>
      </section>
    </>
  );
}
