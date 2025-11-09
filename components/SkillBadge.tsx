"use client";

import { motion } from "framer-motion";

interface SkillBadgeProps {
  name: string;
  category: string;
  description?: string;
  index?: number;
}

export default function SkillBadge({
  name,
  category,
  description,
  index = 0,
}: SkillBadgeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className="group"
    >
      <div className="card p-4 hover:border-accent cursor-default">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
            <span className="text-lg font-bold text-accent">
              {name.charAt(0)}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-light-text dark:text-dark-text text-sm">
              {name}
            </h4>
            {description && (
              <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary mt-0.5 line-clamp-1">
                {description}
              </p>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
