"use client";

"use client";

import { useState, useRef, useEffect, useMemo, KeyboardEvent } from "react";
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

    if (!trimmedCmd) {
      return;
    }

    const nextHistory = [...commandHistory, cmd];
    setCommandHistory(nextHistory);
    setHistoryIndex(-1);

    if (trimmedCmd.startsWith("echo ")) {
      const text = cmd.substring(5);
      setHistory((prev) => [
        ...prev,
        { command: cmd, output: text },
      ]);
      return;
    }

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

    const command = COMMANDS[trimmedCmd];
    if (command) {
      const output = command.action();
      setHistory((prev) => [
        ...prev,
        { command: cmd, output },
      ]);
    } else {
      setHistory((prev) => [
        ...prev,
        {
          command: cmd,
          output: `Command not found: ${cmd}\nType 'help' for available commands.`,
        },
      ]);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInput(newValue);
  };

  const handleKey = (e: KeyboardEvent<HTMLInputElement>) => {
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

  const handleTerminalClick = () => {
    if (!isExpanded) {
      setIsExpanded(true);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto group">
      <div
        className={`relative bg-gray-900/80 backdrop-blur-sm border border-gray-700/50 rounded-lg overflow-hidden transition-all duration-300 ${
          isExpanded ? "h-[600px]" : "h-12 hover:h-16"
        }`}
      >
        <div className="flex items-center justify-between p-3">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-500 cursor-pointer"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/80 hover:bg-yellow-500 cursor-pointer"></div>
              <div 
                className="w-3 h-3 rounded-full bg-green-500/80 hover:bg-green-500 cursor-pointer"
                onClick={() => setIsExpanded(!isExpanded)}
              ></div>
            </div>
            <span className="text-xs text-gray-300 font-mono ml-2">enatan@portfolio:~$</span>
          </div>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-xs text-accent hover:text-accent-hover transition-colors font-mono"
          >
            {isExpanded ? "[close]" : "[expand]"}
          </button>
        </div>

        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-300 font-mono">session: live</span>
            <span className="text-xs text-gray-300 font-mono">user: root</span>
            <span className="text-xs text-gray-300 font-mono">host: enatan.dev</span>
            <span className="text-xs text-gray-300 font-mono">time: {sessionTime}</span>
          </div>
        </div>

