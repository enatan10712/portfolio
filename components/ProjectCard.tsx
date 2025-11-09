"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useRef, useState } from "react";

interface ProjectCardProps {
  title: string;
  slug: string;
  summary: string;
  tech: string[];
  github?: string;
  demo?: string;
  image?: string;
}

export default function ProjectCard({
  title,
  slug,
  summary,
  tech,
  github,
  demo,
  image,
}: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePosition({ x, y });
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      onMouseMove={handleMouseMove}
      className="card-hover spotlight-card group"
      style={
        {
          '--mouse-x': `${mousePosition.x}%`,
          '--mouse-y': `${mousePosition.y}%`,
        } as React.CSSProperties
      }
    >
      {/* Project Image */}
      <div className="relative h-48 mb-4 rounded-lg overflow-hidden bg-gradient-to-br from-light-surface to-light-bg dark:from-dark-surface-hover dark:to-dark-surface border border-light-border/50 dark:border-dark-border/50">
        {image ? (
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <svg
              className="w-16 h-16 text-light-text-secondary dark:text-dark-text-secondary opacity-20"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
        )}
      </div>

      {/* Project Info */}
      <h3 className="text-xl font-bold text-light-text dark:text-dark-text mb-2 group-hover:text-accent transition-colors duration-300">
        {title}
      </h3>
      <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary mb-4 line-clamp-2">
        {summary}
      </p>

      {/* Tech Stack */}
      <div className="flex flex-wrap gap-2 mb-4 relative z-10">
        {tech.slice(0, 4).map((item) => (
          <span
            key={item}
            className="badge text-xs hover:border-accent hover:text-accent transition-all duration-200 cursor-default"
          >
            {item}
          </span>
        ))}
        {tech.length > 4 && (
          <span className="badge text-xs">+{tech.length - 4}</span>
        )}
      </div>

      {/* Links */}
      <div className="flex gap-3">
        <Link
          href={`/projects/${slug}`}
          className="text-sm font-medium text-accent hover:text-accent-hover transition-colors"
        >
          View Details →
        </Link>
        {github && (
          <a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary hover:text-accent transition-colors"
          >
            GitHub
          </a>
        )}
        {demo && (
          <a
            href={demo}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary hover:text-accent transition-colors"
          >
            Live Demo
          </a>
        )}
      </div>
    </motion.div>
  );
}
