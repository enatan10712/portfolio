"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function CTAButtons() {
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Link href="/projects" className="btn-primary text-center inline-block">
          🚀 View Projects ✨
        </Link>
      </motion.div>
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <a
          href="/resume.pdf"
          download
          className="btn-secondary text-center inline-block"
        >
          📥 Download Resume 🌟
        </a>
      </motion.div>
    </div>
  );
}
