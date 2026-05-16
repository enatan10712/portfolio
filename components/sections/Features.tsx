"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Zap,
  Shield,
  Smartphone,
  BarChart3,
  Layout,
  Cpu
} from "lucide-react";

const features = [
  {
    title: "Blazing Fast",
    description: "Built with Next.js 14 App Router for optimal performance and SEO.",
    icon: Zap,
  },
  {
    title: "Secure by Design",
    description: "Production-grade security out of the box for your peace of mind.",
    icon: Shield,
  },
  {
    title: "Mobile First",
    description: "Fully responsive designs that look stunning on every device.",
    icon: Smartphone,
  },
  {
    title: "Advanced Analytics",
    description: "Track your progress with built-in analytics and performance metrics.",
    icon: BarChart3,
  },
  {
    title: "Modular UI",
    description: "Easily customizable components following clean architecture principles.",
    icon: Layout,
  },
  {
    title: "AI Integration",
    description: "Ready for the next wave of AI-driven web applications.",
    icon: Cpu,
  },
];

const Features = () => {
  return (
    <section id="features" className="py-24 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Everything you need</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Powerful features designed to help you build, launch, and scale
            your digital presence with ease.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="p-8 rounded-2xl border border-border bg-card hover:shadow-xl transition-all"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-6">
                <feature.icon size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
