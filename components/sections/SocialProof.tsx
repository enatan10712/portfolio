"use client";

import React from "react";
import { motion } from "framer-motion";

const stack = [
  "Python",
  "React",
  "Next.js",
  "TensorFlow",
  "PyTorch",
  "TypeScript",
];

const SocialProof = () => {
  return (
    <section className="py-20 border-y border-border/50">
      <div className="container mx-auto px-6">
        <p className="text-center text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-12">
          Core Technology Stack
        </p>
        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-50 grayscale hover:grayscale-0 transition-all">
          {stack.map((tech, index) => (
            <motion.span
              key={tech}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-2xl md:text-3xl font-bold tracking-tighter"
            >
              {tech}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
