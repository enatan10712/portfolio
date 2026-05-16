"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "What is your primary area of expertise?",
    answer: "My expertise lies at the intersection of Data Science and Web Security. I specialize in building robust machine learning models and ensuring the security of web applications through rigorous penetration testing.",
  },
  {
    question: "Which technologies do you work with most?",
    answer: "I primarily use Python for data science and ML tasks, and Next.js/TypeScript for web development. For security, I use a variety of specialized tools and manual testing techniques.",
  },
  {
    question: "Are you available for freelance projects?",
    answer: "Yes, I am currently open to new opportunities, including full-time roles and high-impact freelance projects in data science or security auditing.",
  },
  {
    question: "How can I get in touch for a collaboration?",
    answer: "You can reach out to me via the 'Hire Me' button in the hero section or connect with me on LinkedIn. I am always happy to discuss interesting projects and technical challenges.",
  },
];

const FAQItem = ({ question, answer }: { question: string; answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-border">
      <button
        className="w-full py-6 flex items-center justify-between text-left hover:text-primary transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-lg font-semibold">{question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown size={20} />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-muted-foreground leading-relaxed">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FAQ = () => {
  return (
    <section id="faq" className="py-24 bg-muted/30">
      <div className="container mx-auto px-6 max-w-3xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-muted-foreground text-lg">
            Find answers to common questions about my background, services, and expertise.
          </p>
        </div>

        <div className="space-y-2">
          {faqs.map((faq, index) => (
            <FAQItem key={index} {...faq} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
