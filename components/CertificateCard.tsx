"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

interface CertificateCardProps {
  title: string;
  issuer: string;
  date: string;
  image: string;
  credentialUrl?: string;
  skills?: string[];
}

export default function CertificateCard({
  title,
  issuer,
  date,
  image,
  credentialUrl,
  skills,
}: CertificateCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="card-hover group cursor-pointer"
        onClick={() => setIsModalOpen(true)}
      >
        {/* Certificate Image */}
        <div className="relative h-48 mb-4 rounded-lg overflow-hidden bg-gradient-to-br from-light-surface to-light-bg dark:from-dark-surface-hover dark:to-dark-surface border border-light-border/50 dark:border-dark-border/50">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
            <span className="text-white text-sm font-medium">
              🔍 Click to view
            </span>
          </div>
        </div>

        {/* Certificate Info */}
        <h3 className="text-lg font-bold text-light-text dark:text-dark-text mb-2 group-hover:text-accent transition-colors">
          {title}
        </h3>
        <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary mb-2">
          {issuer}
        </p>
        <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary mb-3">
          {date}
        </p>

        {/* Skills */}
        {skills && skills.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span key={skill} className="badge text-xs">
                {skill}
              </span>
            ))}
          </div>
        )}
      </motion.div>

      {/* Modal for full view */}
      {isModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={() => setIsModalOpen(false)}
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="relative max-w-4xl w-full max-h-[90vh] overflow-auto bg-light-surface dark:bg-dark-surface rounded-xl p-6"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-light-bg dark:bg-dark-bg flex items-center justify-center hover:bg-accent hover:text-dark-bg transition-colors z-10"
              aria-label="Close"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Certificate Image */}
            <div className="relative w-full aspect-[16/11] mb-4 rounded-lg overflow-hidden">
              <Image
                src={image}
                alt={title}
                fill
                className="object-contain"
              />
            </div>

            {/* Certificate Details */}
            <div className="space-y-4">
              <div>
                <h2 className="text-2xl font-bold text-light-text dark:text-dark-text mb-2">
                  {title}
                </h2>
                <p className="text-lg text-light-text-secondary dark:text-dark-text-secondary">
                  {issuer}
                </p>
                <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                  Issued: {date}
                </p>
              </div>

              {skills && skills.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-light-text dark:text-dark-text mb-2">
                    Skills Covered:
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill) => (
                      <span key={skill} className="badge">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {credentialUrl && (
                <a
                  href={credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary inline-block"
                >
                  Verify Credential →
                </a>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
}
