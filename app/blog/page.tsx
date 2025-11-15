"use client";

import { motion } from "framer-motion";
import Link from "next/link";

// Mock blog posts - in production these would come from a CMS or markdown files
const blogPosts = [
  {
    slug: "building-production-ml-pipelines",
    title: "Building Production-Ready ML Pipelines",
    excerpt: "Lessons learned from deploying machine learning systems that actually scale and don't break at 3am.",
    date: "2024-01-15",
    readTime: "8 min read",
    tags: ["Machine Learning", "DevOps", "Production"],
  },
  {
    slug: "web-application-security-checklist",
    title: "The Web Application Security Checklist You Actually Need",
    excerpt: "A practical guide to securing web applications beyond the OWASP Top 10, with real-world examples.",
    date: "2023-12-20",
    readTime: "12 min read",
    tags: ["Security", "Web Development"],
  },
  {
    slug: "feature-engineering-for-time-series",
    title: "Feature Engineering for Time Series Forecasting",
    excerpt: "Advanced techniques for extracting signal from noisy financial and sensor data.",
    date: "2023-11-10",
    readTime: "10 min read",
    tags: ["Machine Learning", "Data Science"],
  },
];

const relatedCollections = [
  {
    title: "Security Playbooks",
    description:
      "Step-by-step runbooks for threat modelling, rapid triage, and communicating fixes that stick.",
    href: "/blog/web-application-security-checklist",
    icon: "🛡️",
  },
  {
    title: "MLOps Production Guides",
    description:
      "Favorite patterns for rolling out ML features with guardrails, monitoring, and stakeholder trust.",
    href: "/blog/building-production-ml-pipelines",
    icon: "⚙️",
  },
  {
    title: "Data Storytelling",
    description:
      "Frameworks that turn messy datasets into crisp dashboards and executive narratives.",
    href: "/blog/feature-engineering-for-time-series",
    icon: "📊",
  },
];

const quickTips = [
  {
    label: "Bug bounty recon toolkit",
    detail: "My go-to mix of OSINT scripts, wordlists, and browser extensions for fast wins.",
  },
  {
    label: "ML deployment checklist",
    detail: "Smoke tests, drift alarms, and rollback plans I tick through before shipping models.",
  },
  {
    label: "Designing developer trainings",
    detail: "How I package pentest findings into workshops devs actually enjoy attending.",
  },
  {
    label: "Notebook to API handoff",
    detail: "Favorite ways to harden Jupyter experiments into monitored services in a day.",
  },
];

export default function BlogPage() {
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
            Blog
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-light-text-secondary dark:text-dark-text-secondary max-w-2xl mx-auto"
          >
            Technical deep dives, lessons learned, and practical guides on machine
            learning, security, and software engineering.
          </motion.p>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="section">
        <div className="container-custom max-w-4xl">
          <div className="space-y-8">
            {blogPosts.map((post, index) => (
              <motion.article
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="card-hover p-8"
              >
                <div className="flex flex-wrap gap-2 mb-3">
                  {post.tags.map((tag) => (
                    <span key={tag} className="badge text-xs">
                      {tag}
                    </span>
                  ))}
                </div>

                <Link href={`/blog/${post.slug}`}>
                  <h2 className="text-2xl font-bold text-light-text dark:text-dark-text mb-3 hover:text-accent transition-colors">
                    {post.title}
                  </h2>
                </Link>

                <p className="text-light-text-secondary dark:text-dark-text-secondary mb-4">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between text-sm text-light-text-secondary dark:text-dark-text-secondary">
                  <time dateTime={post.date}>
                    {new Date(post.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                  <span>{post.readTime}</span>
                </div>

                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-block mt-4 text-accent hover:text-accent-hover font-medium transition-colors"
                >
                  Read more →
                </Link>
              </motion.article>
            ))}
          </div>

          {/* Pagination placeholder */}
          <div className="flex justify-center gap-2 mt-12">
            <button className="px-4 py-2 rounded-lg bg-accent text-dark-bg font-medium">
              1
            </button>
            <button className="px-4 py-2 rounded-lg bg-light-surface dark:bg-dark-surface text-light-text dark:text-dark-text hover:bg-accent hover:text-dark-bg transition-colors">
              2
            </button>
            <button className="px-4 py-2 rounded-lg bg-light-surface dark:bg-dark-surface text-light-text dark:text-dark-text hover:bg-accent hover:text-dark-bg transition-colors">
              3
            </button>
          </div>
        </div>
      </section>

      {/* Related Collections */}
      <section className="section bg-light-surface/70 dark:bg-dark-surface/40">
        <div className="container-custom max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold bg-light-bg/80 dark:bg-dark-bg/60 text-accent border border-light-border dark:border-dark-border">
              🔗 Related Resources
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-light-text dark:text-dark-text mt-4 mb-4">
              Deep dives connected to these posts
            </h2>
            <p className="text-light-text-secondary dark:text-dark-text-secondary max-w-2xl mx-auto">
              Explore more context from real engagementswhether you are tuning models or hardening apps.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedCollections.map((item) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3 }}
                className="card-hover p-6 h-full flex flex-col"
              >
                <span className="text-3xl mb-4" aria-hidden>
                  {item.icon}
                </span>
                <h3 className="text-xl font-semibold text-light-text dark:text-dark-text mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary flex-1">
                  {item.description}
                </p>
                <Link
                  href={item.href}
                  className="mt-6 inline-flex items-center gap-2 text-accent font-medium hover:text-accent-hover transition-colors"
                >
                  Read the guide
                  <span aria-hidden>→</span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick tips */}
      <section className="section">
        <div className="container-custom max-w-5xl">
          <div className="grid md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35 }}
              className="card p-8 shadow-lg bg-gradient-to-br from-light-surface to-light-bg dark:from-dark-surface/80 dark:to-dark-surface-hover"
            >
              <h2 className="text-2xl font-bold text-light-text dark:text-dark-text mb-3">
                Field notes & templates
              </h2>
              <p className="text-light-text-secondary dark:text-dark-text-secondary">
                Download-ready checklists, talk tracks, and prompts I reference when bouncing between data and security work.
              </p>
              <Link
                href="/contact"
                className="mt-6 inline-flex items-center gap-2 text-accent font-medium hover:text-accent-hover transition-colors"
              >
                Request access
                <span aria-hidden>→</span>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: 0.1 }}
              className="card p-6"
            >
              <h3 className="text-xl font-semibold text-light-text dark:text-dark-text mb-4">
                Quick win ideas
              </h3>
              <ul className="space-y-4">
                {quickTips.map((tip) => (
                  <li key={tip.label} className="border-l-2 border-accent/70 pl-4">
                    <p className="text-sm font-semibold text-light-text dark:text-dark-text">
                      {tip.label}
                    </p>
                    <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary">
                      {tip.detail}
                    </p>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

    </div>
  );
}
