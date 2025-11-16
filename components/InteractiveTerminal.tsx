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

Journey:
• 2025 (Aug 18): Started data science ✨
• 2020 (COVID): Started web pentesting 🦠

Location: Ethiopia 🌍
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
        <br />─────────────────────────────────────
        <br />
        1. Forex Predictor – ML trading system (12% ROI)
        <br />
        2. Medical Diagnosis – 94% accuracy ML model
        <br />
        3. Security Scanner – OWASP Top 10 detection
        <br />
        <br />
        Type <span className="text-accent">'projects --details'</span> for more info
        <br />
        Or visit{" "}
        <Link href="/projects" className="text-accent hover:underline">
          /projects
        </Link>
      </div>
    ),
  },

  contact: {
    description: "Contact information",
    action: () => `
Contact Information:
─────────────────────────────────────
📧 Email:     enatan10712@gmail.com
🐙 GitHub:    github.com/enatandereje
💼 LinkedIn:  linkedin.com/in/enatandereje
✈️  Telegram:  @enatandereje
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
2020-2022     Security Researcher
2019-2021     Full Stack Developer
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
    const n = baseInput.toLowerCase();
    if (!n || baseInput.includes(" ")) return [];
    return availableCommands.filter((cmd) => cmd.startsWith(n) && cmd !== n).slice(0, 4);
  }, [availableCommands, baseInput]);

  useEffect(() => {
    if (isExpanded && inputRef.current) inputRef.current.focus();
  }, [isExpanded]);

  useEffect(() => {
    const update = () => setSessionTime(new Date().toLocaleTimeString());
    update();
    const i = setInterval(update, 60000);
    return () => clearInterval(i);
  }, []);

  useEffect(() => {
    if (terminalRef.current)
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
  }, [history]);

  const executeCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    if (!trimmed) return;

    const nextHistory = [...commandHistory, cmd];
    setCommandHistory(nextHistory);
    setHistoryIndex(-1);

    if (trimmed.startsWith("echo ")) {
      setHistory((prev) => [...prev, { command: cmd, output: cmd.substring(5) }]);
      return;
    }

    if (trimmed === "clear") {
      setHistory([]);
      return;
    }

    if (trimmed === "history") {
      const body = nextHistory
        .map((h, i) => `${i + 1}. ${h}`)
        .join("\n");
      setHistory((p) => [...p, { command: cmd, output: body }]);
      return;
    }

    const command = COMMANDS[trimmed];
    if (command) {
      setHistory((p) => [...p, { command: cmd, output: command.action() }]);
    } else {
      setHistory((p) => [
        ...p,
        { command: cmd, output: `Command not found: ${cmd}\nType 'help' for available commands.` },
      ]);
    }
  };

  const handleKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      executeCommand(input);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length) {
        const newIndex =
          historyIndex === -1
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
      const matches = availableCommands.filter((cmd) =>
        cmd.startsWith(baseInput.toLowerCase())
      );
      if (matches.length === 1) setInput(matches[0]);
      else if (matches.length > 1)
        setHistory((p) => [
          ...p,
          { command: input, output: `Possible commands: ${matches.join(", ")}` },
        ]);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto group">
      <div
        className={`relative bg-gray-900/80 backdrop-blur-sm border border-gray-700/50 rounded-lg overflow-hidden transition-all duration-300 ${
          isExpanded ? "h-[600px]" : "h-12 hover:h-16"
        }`}
        onClick={() => !isExpanded && setIsExpanded(true)}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-3">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
              <div
                className="w-3 h-3 rounded-full bg-green-500/80 cursor-pointer"
                onClick={() => setIsExpanded(!isExpanded)}
              ></div>
            </div>
            <span className="text-xs text-gray-300 font-mono ml-2">
              enatan@portfolio:~$
            </span>
          </div>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-xs text-accent font-mono"
          >
            {isExpanded ? "[close]" : "[expand]"}
          </button>
        </div>

        {/* INFO BAR */}
        {isExpanded && (
          <div className="flex items-center gap-4 px-3 mb-2 text-xs text-gray-300 font-mono flex-wrap">
            <span>session: live</span>
            <span>user: root</span>
            <span>host: enatan.dev</span>
            <span>time: {sessionTime}</span>
          </div>
        )}

        {/* TERMINAL BODY */}
        {isExpanded && (
          <div
            ref={terminalRef}
            className="px-3 pb-4 overflow-y-auto h-[480px] space-y-3 font-mono text-sm text-gray-200"
          >
            {history.map((entry, idx) => (
              <div key={idx}>
                {entry.command && (
                  <div className="text-accent">
                    root@enatan.dev:~$ {entry.command}
                  </div>
                )}
                <pre className="whitespace-pre-wrap">{entry.output}</pre>
              </div>
            ))}

            {/* INPUT */}
            <div className="flex items-center gap-2 mt-2">
              <span className="text-accent">root@enatan.dev:~$</span>
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKey}
                className="bg-transparent outline-none flex-1"
                autoFocus
              />
            </div>

            {/* SUGGESTIONS */}
            {suggestionMatches.length > 0 && (
              <div className="text-gray-400 text-xs mt-1">
                Suggestions: {suggestionMatches.join(", ")}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
