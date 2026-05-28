"use client";

import React from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

const tiers = [
  {
    name: "Consultation",
    price: "Free",
    description: "Initial 30-minute project scoping and advice.",
    features: ["Project Strategy", "Tech Stack Review", "Roadmap Planning"],
    buttonText: "Book Now",
    highlight: false,
  },
  {
    name: "Development",
    price: "Custom",
    description: "Full-cycle implementation of data or web projects.",
    features: ["End-to-end Development", "ML Integration", "Security Best Practices", "Scalable Architecture"],
    buttonText: "Inquire",
    highlight: true,
  },
  {
    name: "Audit",
    price: "Custom",
    description: "In-depth security assessment or data pipeline review.",
    features: ["Penetration Testing", "Vulnerability Analysis", "Data Quality Audit", "Performance Tuning"],
    buttonText: "Request Audit",
    highlight: false,
  },
];

const Pricing = () => {
  return (
    <section id="pricing" className="py-24">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Service Offerings</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Transparent engagement models tailored to your project's specific needs.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {tiers.map((tier, index) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className={`p-8 rounded-3xl border ${
                tier.highlight
                  ? "border-primary bg-primary/5 shadow-2xl relative overflow-hidden"
                  : "border-border bg-card"
              }`}
            >
              {tier.highlight && (
                <div className="absolute top-0 right-0 px-4 py-1 bg-primary text-primary-foreground text-xs font-bold rounded-bl-xl uppercase tracking-widest">
                  Most Popular
                </div>
              )}
              <h3 className="text-xl font-bold mb-2">{tier.name}</h3>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-4xl font-bold">{tier.price}</span>
              </div>
              <p className="text-sm text-muted-foreground mb-8">{tier.description}</p>

              <ul className="space-y-4 mb-8">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-sm">
                    <Check size={16} className="text-primary" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-4 rounded-xl font-bold transition-all ${
                  tier.highlight
                    ? "bg-primary text-primary-foreground hover:opacity-90"
                    : "border border-border hover:bg-muted"
                }`}
              >
                {tier.buttonText}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
