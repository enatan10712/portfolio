"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const terminalCommands = [
  { command: "whoami", output: "enatan-dereje" },
  { command: "pwd", output: "/portfolio/data-science" },
  { command: "ls -la skills/", output: "python  machine-learning  security  devops" },
];

export default function MinimalTerminalTile() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="card bg-dark-surface-hover dark:bg-dark-surface">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
          </div>
          <span className="text-xs text-dark-text-secondary ml-2 font-mono">
            terminal
          </span>
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-xs text-accent hover:text-accent-hover transition-colors"
          aria-label={isExpanded ? "Collapse terminal" : "Expand terminal"}
        >
          {isExpanded ? "Collapse" : "Expand"}
        </button>
      </div>

      <AnimatePresence initial={false}>
        {isExpanded ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="font-mono text-xs space-y-2 bg-dark-bg/50 rounded-lg p-4">
              {terminalCommands.map((item, index) => (
                <div key={index}>
                  <div className="flex items-center gap-2 text-accent">
                    <span>$</span>
                    <span className="text-dark-text">{item.command}</span>
                  </div>
                  <div className="text-dark-text-secondary ml-4 mt-1">
                    {item.output}
                  </div>
                </div>
              ))}
              <div className="flex items-center gap-2 text-accent">
                <span>$</span>
                <span className="text-dark-text-secondary animate-pulse">_</span>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="font-mono text-xs text-dark-text-secondary"
          >
            <span className="text-accent">$</span> Click to expand
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
