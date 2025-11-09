"use client";

import { useState, useRef, useEffect, useMemo, KeyboardEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

interface HistoryItem {
  command: string;
  output: string | JSX.Element;
}

const ASCII_ART = `
███████╗███╗   ██╗ █████╗ ████████╗ █████╗ ███╗   ██╗
██╔════╝████╗  ██║██╔══██╗╚══██╔══╝██╔══██╗████╗  ██║
█████╗  ██╔██╗ ██║███████║   ██║   ███████║██╔██╗ ██║
██╔══╝  ██║╚██╗██║██╔══██║   ██║   ██╔══██║██║╚██╗██║
███████╗██║ ╚████║██║  ██║   ██║   ██║  ██║██║ ╚████║
╚══════╝╚═╝  ╚═══╝╚═╝  ╚═╝   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═══╝
`;

const COMMANDS: Record<string, { description: string; action: () => string | JSX.Element }> = {
  help: {
    description: "Show available commands",
    action: () => `
Available commands:
  help       - Show this help message
  about      - About Enatan Dereje
  skills     - List technical skills
  projects   - Show featured projects
  contact    - Get contact information
  resume     - Download resume
  experience - Show work experience
  clear      - Clear terminal
  whoami     - Current user
  history    - Show recent commands
  date       - Current date and time
  echo       - Echo text back
  banner     - Show ASCII banner
`,
  },
  about: {
    description: "About me",
    action: () => `
Enatan Dereje
─────────────────────────────────────
📊 Data Scientist • 🔐 Web Pentester • 💻 Developer

What I do:
• 📊 Build machine learning models
• 🧹 Clean and analyze large datasets
• 🔐 Test websites for security problems
• 🚀 Create reliable systems that scale
• 🛡️ Help teams fix security issues

Certifications:
• 🧠 Simplilearn SQL (#9191317) — 17 Oct 2025
• 🐍 Python for Data Science (UC-68243772) — 01 Oct 2025
• 🛠️ Simplilearn Programming Essentials (#9040069) — 24 Sep 2025
• 🎓 EC-Council EHE (#188212) — 02 Jan 2023
• 🔐 INSA Cyber Talent — Dec 2022
• 🛡️ Udemy InfoSec — 15 Dec 2022
• 🧩 CSS/Bootstrap + Python Stack (UC-b7567d76) — 11 Dec 2022
• 🎨 Graphics & Video Masterclass (UC-d76c3f04) — 11 Dec 2022
• 🔎 OSINT (SBT) — 15 Feb 2024 (ID #520813553)
• 🐛 Android Bug Bounty (#294458) — 09 Feb 2024
• 🌐 IP Addressing & Subnetting (UC-33ca777e) — 15 Dec 2022
• 🕵️ Ethical Hacking Zero to Hero (UC-f8fd45ef) — 15 Dec 2022

Journey:
• 2025 (Aug 18): Started data science ✨
• 2020 (COVID): Started web pentesting 🦠

Location: Remote / Ethiopia 🌍
Status: Open to opportunities ✨
`,
  },
  skills: {
    description: "Technical skills",
    action: () => `
Technical Skills:
─────────────────────────────────────
🐍 Python        ████████████ Expert
⚛️  React         ███████████░ Advanced
🔐 Security      ████████████ Expert
🤖 ML/AI         ███████████░ Advanced
🐳 Docker        ██████████░░ Advanced
☁️  AWS           █████████░░░ Intermediate
📊 Data Science  ████████████ Expert
`,
  },
  projects: {
    description: "Featured projects",
    action: () => (
      <div>
        Featured Projects:
        ─────────────────────────────────────
        1. Forex Predictor - ML trading system (12% ROI)
        2. Medical Diagnosis - 94% accuracy ML model
        3. Security Scanner - OWASP Top 10 detection
        <br />
        <br />
        Type 'projects --details' for more info
        <br />
        Or visit{" "}
        <a href="/projects" className="text-accent hover:underline">
          /projects
        </a>
      </div>
    ),
  },
  contact: {
    description: "Contact information",
    action: () => `
Contact Information:
─────────────────────────────────────
📧 Email:     enatan10712@gmail.com
💼 LinkedIn:  linkedin.com/in/enatandereje
🐙 GitHub:    github.com/enatandereje
✈️  Telegram:  @enatandereje

Available for:
• Freelance Projects
• Full-time Opportunities
• Collaboration
• Consulting
`,
  },
  resume: {
    description: "Download resume",
    action: () => `
Downloading resume...
✅ Resume download started!

Direct link: /resume.pdf
`,
  },
  experience: {
    description: "Work experience",
    action: () => `
Experience:
─────────────────────────────────────
2021-Present  Data Scientist
              Building ML models and data pipelines

2020-2022     Security Researcher
              Penetration testing & vulnerability research

2019-2021     Full Stack Developer
              React, Node.js, Python applications
`,
  },
  whoami: {
    description: "Current user",
    action: () => "root",
  },
  date: {
    description: "Show current date",
    action: () => new Date().toString(),
  },
  clear: {
    description: "Clear terminal",
    action: () => "",
  },
  banner: {
    description: "Show ASCII banner",
    action: () => ASCII_ART,
  },
};

export default function InteractiveTerminal() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<HistoryItem[]>([
    {
      command: "",
      output: `Welcome to Enatan's Portfolio Terminal! 🚀
Type 'help' to see available commands.`,
    },
  ]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const [sessionTime, setSessionTime] = useState<string | null>(null);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [errorShake, setErrorShake] = useState(false);
  const availableCommands = useMemo(
    () => Array.from(new Set([...Object.keys(COMMANDS), "history"])),
    []
  );
  const baseInput = input.trim();
  const suggestionMatches = useMemo(() => {
    const normalized = baseInput.toLowerCase();
    const hasSpace = baseInput.includes(" ");
    if (!normalized || hasSpace) {
      return [] as string[];
    }
    return availableCommands
      .filter((cmd) => cmd.startsWith(normalized) && cmd !== normalized)
      .slice(0, 4);
  }, [availableCommands, baseInput]);

  useEffect(() => {
    if (isExpanded && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isExpanded]);

  useEffect(() => {
    const updateTime = () => setSessionTime(new Date().toLocaleTimeString());
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const executeCommand = (cmd: string) => {
    const normalizedInput = cmd.trim();
    const trimmedCmd = normalizedInput.toLowerCase();

    if (!trimmedCmd) return;

    const nextHistory = [...commandHistory, cmd];
    setCommandHistory(nextHistory);
    setHistoryIndex(-1);

    // Handle echo command
    if (trimmedCmd.startsWith("echo ")) {
      const text = cmd.substring(5);
      setHistory((prev) => [
        ...prev,
        { command: cmd, output: text },
      ]);
      return;
    }

    // Handle clear command
    if (trimmedCmd === "clear") {
      setHistory([]);
      return;
    }

    if (trimmedCmd === "history") {
      const historyOutput = nextHistory.length
        ? nextHistory.map((entry, idx) => `${idx + 1}. ${entry}`).join("\n")
        : "No commands executed yet.";
      setHistory((prev) => [
        ...prev,
        { command: cmd, output: historyOutput },
      ]);
      return;
    }

    // Execute command
    const command = COMMANDS[trimmedCmd];
    if (command) {
      const output = command.action();
      setErrorShake(false);
      setHistory((prev) => [
        ...prev,
        { command: cmd, output },
      ]);
    } else {
      setErrorShake(true);
      setTimeout(() => setErrorShake(false), 320);
      setHistory((prev) => [
        ...prev,
        {
          command: cmd,
          output: `Command not found: ${cmd}\nType 'help' for available commands.`,
        },
      ]);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      executeCommand(input);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex === -1 
          ? commandHistory.length - 1 
          : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex !== -1) {
        const newIndex = historyIndex + 1;
        if (newIndex >= commandHistory.length) {
          setHistoryIndex(-1);
          setInput("");
        } else {
          setHistoryIndex(newIndex);
          setInput(commandHistory[newIndex]);
        }
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      const normalized = baseInput.toLowerCase();
      const hasSpace = baseInput.includes(" ");
      if (!normalized || hasSpace) {
        return;
      }
      const matches = availableCommands.filter((cmd) => cmd.startsWith(normalized));
      if (matches.length === 1) {
        setInput(matches[0]);
      } else if (matches.length > 1) {
        setHistory((prev) => [
          ...prev,
          {
            command: input,
            output: `Possible commands: ${matches.join(", ")}`,
          },
        ]);
      }
    }
  };

  return (
    <div className="card bg-dark-surface-hover dark:bg-dark-surface hover:shadow-2xl transition-shadow">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-500 cursor-pointer transition-colors"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/80 hover:bg-yellow-500 cursor-pointer transition-colors"></div>
            <div
              className="w-3 h-3 rounded-full bg-green-500/80 hover:bg-green-500 cursor-pointer transition-colors"
              onClick={() => setIsExpanded(!isExpanded)}
            ></div>
          </div>
          <span className="text-xs text-dark-text-secondary ml-2 font-mono">
            enatan@portfolio:~$
          </span>
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-xs text-accent hover:text-accent-hover transition-colors font-mono"
          aria-label={isExpanded ? "Collapse terminal" : "Expand terminal"}
        >
          {isExpanded ? "[close]" : "[expand]"}
        </button>
      </div>

      <div className="flex flex-wrap gap-4 text-[11px] text-dark-text-secondary/80 font-mono mb-3">
        <span>session: live</span>
        <span>user: root</span>
        <span>host: enatan.dev</span>
        <span>time: {sessionTime}</span>
      </div>

      <AnimatePresence initial={false}>
        {isExpanded ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div
              ref={terminalRef}
              className="font-mono text-xs bg-dark-bg/50 rounded-lg p-4 max-h-[400px] overflow-y-auto"
              onClick={() => inputRef.current?.focus()}
            >
              {/* Command history */}
              <AnimatePresence initial={false}>
                {history.map((item, index) => (
                  <motion.div
                    key={`${item.command}-${index}`}
                    layout
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="mb-3"
                  >
                    {item.command && (
                      <div className="flex items-start gap-2">
                        <span className="text-accent">$</span>
                        <span className="text-dark-text">{item.command}</span>
                      </div>
                    )}
                    {item.output && (
                      <div className="text-dark-text-secondary whitespace-pre-wrap ml-4 mt-1">
                        {item.output}
                      </div>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Input line */}
              <motion.div
                animate={errorShake ? { x: [0, -5, 5, -3, 3, 0] } : { x: 0 }}
                transition={{ duration: 0.28 }}
                className={`flex items-center gap-2 rounded px-2 py-1 transition-colors ${
                  isInputFocused ? "bg-accent/10 border border-accent/70" : "border border-transparent"
                }`}
              >
                <span className="text-accent">$</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  onFocus={() => setIsInputFocused(true)}
                  onBlur={() => setIsInputFocused(false)}
                  className="flex-1 bg-transparent border-none outline-none text-dark-text"
                  placeholder="Type 'help' for commands..."
                  spellCheck={false}
                  autoComplete="off"
                />
                <span className="text-accent animate-pulse">█</span>
              </motion.div>

              {suggestionMatches.length > 0 && (
                <div className="mt-2 text-[10px] text-dark-text-secondary">
                  Suggestions: {suggestionMatches.join("  •  ")}
                </div>
              )}

              <div className="mt-4 text-[10px] text-dark-text-secondary/50">
                💡 Tip: Use ↑/↓ arrows for history, Tab for autocomplete
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="font-mono text-xs text-dark-text-secondary cursor-pointer hover:text-accent transition-colors"
            onClick={() => setIsExpanded(true)}
          >
            <span className="text-accent">$</span> Interactive terminal - Click to
            expand and type commands
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
