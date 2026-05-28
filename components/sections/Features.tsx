"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Database,
  ShieldCheck,
  Code2,
  Cpu,
  Search,
  Rocket
} from "lucide-react";

const expertise = [
  {
    title: "Data Science",
    description: "Building ML pipelines, cleaning large datasets, and conducting reproducible experiments.",
    icon: Database,
  },
  {
    title: "Web Pentesting",
    description: "Testing websites for security vulnerabilities and providing comprehensive reports.",
    icon: ShieldCheck,
  },
  {
    title: "Full Stack Dev",
    description: "Creating reliable, scalable systems using modern frameworks like Next.js and React.",
    icon: Code2,
  },
  {
    title: "ML Engineering",
    description: "Designing and deploying machine learning models for production environments.",
    icon: Cpu,
  },
  {
    title: "Security Research",
    description: "Investigating emerging threats and developing robust defense mechanisms.",
    icon: Search,
  },
  {
    title: "DevOps",
    description: "Automating workflows and ensuring high availability for critical infrastructure.",
    icon: Rocket,
  },
];

const Features = () => {
  return (
    <section id="features" className="py-24 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Technical Expertise</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A diverse skill set focused on building secure, data-driven applications
            that deliver real impact.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {expertise.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="p-8 rounded-2xl border border-border bg-card hover:shadow-xl transition-all"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-6">
                <item.icon size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">{item.title}</h3>
              <p className="text-muted-foreground">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
