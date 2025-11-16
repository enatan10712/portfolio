"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import ProjectCard from "@/components/ProjectCard";
import projectsData from "@/data/projects.json";

// Show all projects by default, regardless of the featured property
const allProjects = projectsData;

// Debug log to check projects data
console.log('All Projects:', allProjects);

const categories = ["All", "ML", "Security", "DevOps", "Visualization"];

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState("All");

  // Debug log for projects and categories
  console.log('Active Filter:', activeFilter);
  console.log('All Projects:', allProjects.map(p => ({ title: p.title, categories: p.category })));

  const filteredProjects =
    activeFilter === "All"
      ? allProjects
      : allProjects.filter((project) =>
          project.category.some(cat => 
            cat.toLowerCase() === activeFilter.toLowerCase()
          )
        );
  
  console.log('Filtered Projects:', filteredProjects.map(p => p.title));

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="section pt-32 pb-12 bg-light-surface dark:bg-dark-surface/50">
        <div className="container-custom text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-light-text dark:text-dark-text mb-4"
          >
            🚀 Projects
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-light-text-secondary dark:text-dark-text-secondary max-w-2xl mx-auto"
          >
            A collection of 15 Python, SQL, and Jupyter notebook projects spanning data science, 
            machine learning, and analytics. Each project emphasizes measurable impact with 
            real-world metrics and results. 📊✨
          </motion.p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="section pt-12">
        <div className="container-custom">
          <div className="flex flex-wrap gap-3 justify-center mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  activeFilter === category
                    ? "bg-accent text-dark-bg"
                    : "bg-light-surface dark:bg-dark-surface text-light-text-secondary dark:text-dark-text-secondary hover:text-accent border border-light-border dark:border-dark-border"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          <motion.div
            layout
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredProjects.map((project) => (
              <ProjectCard key={project.slug} {...project} />
            ))}
          </motion.div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-12">
              <p className="text-light-text-secondary dark:text-dark-text-secondary">
                No projects found in this category.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
