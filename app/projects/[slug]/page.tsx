import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import projectsData from "@/data/projects.json";

// Convert the projects array to a record with slugs as keys
const projects = projectsData.reduce((acc, project) => {
  acc[project.slug] = {
    title: project.title,
    summary: project.summary,
    problem: "Detailed problem statement not available.",
    approach: "Detailed approach not available.",
    tools: project.tech || [],
    results: ["Project details coming soon."],
    github: project.github,
    demo: project.demo,
    image: project.image,
    howToReproduce: "Check the GitHub repository for setup instructions."
  };
  return acc;
}, {} as Record<string, any>);

export default function ProjectDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const project = projects[params.slug];

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="section pt-32 pb-12 bg-light-surface dark:bg-dark-surface/50">
        <div className="container-custom">
          <Link
            href="/projects"
            className="inline-flex items-center text-accent hover:text-accent-hover mb-6"
          >
            ← Back to Projects
          </Link>

          <h1 className="text-4xl md:text-5xl font-bold text-light-text dark:text-dark-text mb-4">
            {project.title}
          </h1>
          <p className="text-xl text-light-text-secondary dark:text-dark-text-secondary">
            {project.summary}
          </p>

          <div className="flex flex-wrap gap-4 mt-6">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                View on GitHub
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                Live Demo
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="section">
        <div className="container-custom max-w-4xl">
          <div className="space-y-12">
            {/* Problem */}
            <div>
              <h2 className="text-2xl font-bold text-light-text dark:text-dark-text mb-4">
                Problem
              </h2>
              <p className="text-light-text-secondary dark:text-dark-text-secondary leading-relaxed">
                {project.problem}
              </p>
            </div>

            {/* Approach */}
            <div>
              <h2 className="text-2xl font-bold text-light-text dark:text-dark-text mb-4">
                Approach
              </h2>
              <p className="text-light-text-secondary dark:text-dark-text-secondary leading-relaxed">
                {project.approach}
              </p>
            </div>

            {/* Tools */}
            <div>
              <h2 className="text-2xl font-bold text-light-text dark:text-dark-text mb-4">
                Tools & Technologies
              </h2>
              <div className="flex flex-wrap gap-2">
                {project.tools.map((tool: string) => (
                  <span key={tool} className="badge">
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            {/* Results */}
            <div>
              <h2 className="text-2xl font-bold text-light-text dark:text-dark-text mb-4">
                Results & Impact
              </h2>
              <ul className="space-y-2">
                {project.results.map((result: string, index: number) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 text-light-text-secondary dark:text-dark-text-secondary"
                  >
                    <span className="text-accent mt-1">✓</span>
                    <span>{result}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* How to Reproduce */}
            <div>
              <h2 className="text-2xl font-bold text-light-text dark:text-dark-text mb-4">
                How to Reproduce
              </h2>
              <div className="card bg-dark-surface p-6">
                <pre className="text-sm text-dark-text font-mono overflow-x-auto whitespace-pre-wrap">
                  {project.howToReproduce.trim()}
                </pre>
              </div>
            </div>

            {/* Optional: Embedded Demo Placeholder */}
            {project.demo && (
              <div>
                <h2 className="text-2xl font-bold text-light-text dark:text-dark-text mb-4">
                  Interactive Demo
                </h2>
                <div className="card p-4">
                  <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary mb-4">
                    Embedded demo (Streamlit/Gradio iframe):
                  </p>
                  <div className="aspect-video bg-dark-surface rounded-lg flex items-center justify-center">
                    <p className="text-dark-text-secondary">
                      Demo iframe would load here
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
