"use client";

import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { TerminalEffects, TerminalGlowEffect, TerminalPulseEffect } from "./TerminalEffects";

// -----------------------------
// InteractiveTerminal (single-file React component)
// Features added: autocomplete suggestions, typewriter output, fake sudo responses,
// theme switcher, draggable terminal, boot sequence, persisted history (localStorage),
// system info & users commands, and clean Vercel-friendly structure.
// -----------------------------

type Output = string | JSX.Element;
interface HistoryItem {
  command: string;
  output: Output;
  animated?: boolean; // whether to typewriter animate this output
}

const ASCII_ART = `
███████╗███╗   ██╗ █████╗ ████████╗ █████╗ ███╗   ██╗
██╔════╝████╗  ██║██╔══██╗╚══██╔══╝██╔══██╗████╗  ██║
█████╗  ██╔██╗ ██║███████║   ██║   ███████║██╔██╗ ██║
██╔══╝  ██║╚██╗██║██╔══██║   ██║   ██╔══██║██║╚██╗██║
███████╗██║ ╚████║██║  ██║   ██║   ██║  ██║██║ ╚████║
╚══════╝╚═╝  ╚═══╝╚═╝  ╚═╝   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═══╝
`;

const THEMES: Record<string, { bg: string; accent: string; text: string; secondary: string }> = {
  default: { bg: "bg-gray-900", accent: "#6ee7b7", text: "text-gray-100", secondary: "text-gray-400" },
  dracula: { bg: "bg-[#282a36]", accent: "#bd93f9", text: "text-[#f8f8f2]", secondary: "text-[#6272a4]" },
  neon: { bg: "bg-[#050406]", accent: "#00f5ff", text: "text-[#e6f7ff]", secondary: "text-[#8bdcff]" },
  matrix: { bg: "bg-[#07190b]", accent: "#00ff41", text: "text-[#dfffd8]", secondary: "text-[#6fbf6f]" },
  nord: { bg: "bg-[#2e3440]", accent: "#88c0d0", text: "text-[#eceff4]", secondary: "text-[#93a3b3]" },
};

// Helper: safe access to localStorage
const lsGet = (k: string) => {
  try {
    return localStorage.getItem(k);
  } catch {
    return null;
  }
};
const lsSet = (k: string, v: string) => {
  try {
    localStorage.setItem(k, v);
  } catch {}
};

export default function InteractiveTerminal() {
  // UI state
  const [isExpanded, setIsExpanded] = useState(false);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<HistoryItem[]>(() => {
    const raw = lsGet("enatan_terminal_history");
    if (raw) {
      try {
        return JSON.parse(raw) as HistoryItem[];
      } catch {
        return [];
      }
    }
    return [
      { command: "", output: "Welcome to Enatan's Portfolio Terminal! Type 'help' to see commands.", animated: false },
    ];
  });
  const [commandHistory, setCommandHistory] = useState<string[]>(() => {
    const raw = lsGet("enatan_terminal_cmds");
    if (raw) {
      try {
        return JSON.parse(raw) as string[];
      } catch {
        return [];
      }
    }
    return [];
  });
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [themeKey, setThemeKey] = useState<string>(() => lsGet("enatan_terminal_theme") || "default");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isTypingOutput, setIsTypingOutput] = useState(false);
  const [isBooting, setIsBooting] = useState(() => {
    const booted = lsGet("enatan_terminal_booted");
    return booted ? false : true;
  });
  const [position, setPosition] = useState<{ x: number; y: number }>(() => {
    const raw = lsGet("enatan_terminal_pos");
    if (raw) {
      try {
        return JSON.parse(raw);
      } catch {
        return { x: 0, y: 0 };
      }
    }
    return { x: 0, y: 0 };
  });

  const inputRef = useRef<HTMLInputElement | null>(null);
  const terminalRef = useRef<HTMLDivElement | null>(null);
  const dragRef = useRef<HTMLDivElement | null>(null);
  const dragData = useRef<{ dragging: boolean; startX: number; startY: number; origX: number; origY: number }>({
    dragging: false,
    startX: 0,
    startY: 0,
    origX: 0,
    origY: 0,
  });

  // Available commands
  const COMMANDS = useMemo(() => {
    return {
      help: () => `Available commands:\n  help       - Show this help message\n  about      - About Enatan Dereje\n  skills     - List technical skills\n  projects   - Show featured projects\n  contact    - Get contact information\n  resume     - Download resume\n  experience - Show work experience\n  clear      - Clear terminal\n  whoami     - Current user\n  history    - Show recent commands\n  date       - Current date and time\n  echo       - Echo text back\n  banner     - Show ASCII banner\n  theme      - Change theme (e.g. theme dracula)\n  sudo       - fake sudo (nice try)\n  sysinfo    - Show browser/system info\n  users      - Show fake system users\n`,

      about: () => `Enatan Dereje\n─────────────────────────────────────\n📊 Data Scientist • 🔐 Web Pentester • 💻 Developer\n\nLocation: Ethiopia\nStatus: Open to opportunities\n`,

      skills: () => `Python, React, Security, ML/AI, Docker, AWS, Data Science`,

      projects: () => (
        <div>
          Featured Projects:<br />─────────────────────────────────────<br />
          1. Forex Predictor – ML trading system (12% ROI)<br />
          2. Medical Diagnosis – 94% accuracy ML model<br />
          3. Security Scanner – OWASP Top 10 detection<br />
          <br />
          More: <Link href="/projects" className="text-accent underline">/projects</Link>
        </div>
      ),

      contact: () => `Email: enatan10712@gmail.com\nLinkedIn: linkedin.com/in/enatandereje\nGitHub: github.com/enatandereje`,

      resume: () => `/resume.pdf`,

      experience: () => `2021-Present: Data Scientist\n2020-2022: Security Researcher\n2019-2021: Full Stack Developer`,

      whoami: () => "root",

      date: () => new Date().toString(),

      banner: () => ASCII_ART,

      theme: (args?: string[]) => {
        const key = args && args[0] ? args[0].toLowerCase() : null;
        if (!key) {
          return `Available themes: ${Object.keys(THEMES).join(", ")}. Current: ${themeKey}`;
        }
        if (!THEMES[key]) return `Theme not found: ${key}`;
        setThemeKey(key);
        lsSet("enatan_terminal_theme", key);
        return `Theme set to ${key}`;
      },

      sudo: (args?: string[]) => {
        // playful fake sudo handler
        const cmd = args ? args.join(" ") : "";
        if (cmd.includes("rm -rf") || cmd.includes("format")) {
          return `Error: Nice try. Destructive operations are disabled. 😈`;
        }
        return `root password required for '${cmd}'\nError: Permission denied (but we see you trying).`;
      },

      sysinfo: () => {
        const nav = typeof navigator !== "undefined" ? navigator : ({} as any);
        const ua = nav.userAgent || "unknown";
        const platform = (nav as any).platform || "unknown";
        return `System Info:\n  User Agent: ${ua}\n  Platform: ${platform}\n  Languages: ${(nav as any).language || (nav as any).languages || "unknown"}`;
      },

      users: () => `root\ndaemon\nwww-data\nenatan (you)\nguest`,
    } as Record<
      string,
      ((args?: string[]) => string | JSX.Element)
    >;
  }, [themeKey]);

  const availableCommandNames = useMemo(() => Object.keys(COMMANDS), [COMMANDS]);

  // Autocomplete suggestions
  const suggestionMatches = useMemo(() => {
    const trimmed = input.trim().toLowerCase();
    if (!trimmed || trimmed.includes(" ")) return [] as string[];
    return availableCommandNames.filter((c) => c.startsWith(trimmed)).slice(0, 6);
  }, [input, availableCommandNames]);

  // Persist history whenever it changes
  useEffect(() => {
    lsSet("enatan_terminal_history", JSON.stringify(history));
  }, [history]);
  useEffect(() => {
    lsSet("enatan_terminal_cmds", JSON.stringify(commandHistory));
  }, [commandHistory]);

  // Focus input when expanded
  useEffect(() => {
    if (isExpanded && inputRef.current) inputRef.current.focus();
  }, [isExpanded]);

  // Scroll to bottom on history change
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  // Boot sequence
  useEffect(() => {
    if (!isBooting) return;
    const steps = [
      "Initializing system...",
      "Loading modules...",
      "Decrypting portfolio assets...",
      "Mounting UI drivers...",
      "Ready.",
    ];
    let i = 0;
    setIsTypingOutput(true);
    const tick = () => {
      if (i >= steps.length) {
        setIsTypingOutput(false);
        setIsBooting(false);
        lsSet("enatan_terminal_booted", "1");
        return;
      }
      setHistory((prev) => [...prev, { command: "boot", output: steps[i], animated: true }]);
      i++;
      setTimeout(tick, 700);
    };
    setTimeout(tick, 400);
  }, [isBooting]);

  // Draggable implementation (pointer events)
  useEffect(() => {
    const el = dragRef.current;
    if (!el) return;

    const onPointerDown = (e: PointerEvent) => {
      dragData.current.dragging = true;
      dragData.current.startX = e.clientX;
      dragData.current.startY = e.clientY;
      dragData.current.origX = position.x;
      dragData.current.origY = position.y;
      (el as HTMLElement).setPointerCapture(e.pointerId);
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!dragData.current.dragging) return;
      const dx = e.clientX - dragData.current.startX;
      const dy = e.clientY - dragData.current.startY;
      const nx = dragData.current.origX + dx;
      const ny = dragData.current.origY + dy;
      setPosition({ x: nx, y: ny });
    };

    const onPointerUp = (e: PointerEvent) => {
      dragData.current.dragging = false;
      try {
        (el as HTMLElement).releasePointerCapture(e.pointerId);
      } catch {}
      lsSet("enatan_terminal_pos", JSON.stringify({ x: position.x, y: position.y }));
    };

    el.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);

    return () => {
      el.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
    };
  }, [position.x, position.y]);

  // Execute command
  const executeCommand = useCallback(
    (rawInput: string) => {
      const trimmed = rawInput.trim();
      if (!trimmed) return;

      setCommandHistory((prev) => [...prev, trimmed]);
      setHistoryIndex(-1);

      // handle 'echo' specially
      if (trimmed.toLowerCase().startsWith("echo ")) {
        const out = trimmed.slice(5);
        setHistory((prev) => [...prev, { command: trimmed, output: out, animated: false }]);
        return;
      }

      // handle clear
      if (trimmed.toLowerCase() === "clear") {
        setHistory([]);
        return;
      }

      // handle history command
      if (trimmed.toLowerCase() === "history") {
        const out = commandHistory.length ? commandHistory.join("\n") : "No commands executed yet.";
        setHistory((prev) => [...prev, { command: trimmed, output: out, animated: false }]);
        return;
      }

      // parse command and args
      const parts = trimmed.split(/\s+/);
      const cmd = parts[0].toLowerCase();
      const args = parts.slice(1);

      const handler = (COMMANDS as any)[cmd] as ((a?: string[]) => string | JSX.Element) | undefined;
      if (handler) {
        // decide if we want typewriter animation for this command
        const shouldAnimate = cmd !== "projects" && cmd !== "contact" && cmd !== "resume";
        const result = handler(args);
        setHistory((prev) => [...prev, { command: trimmed, output: result, animated: shouldAnimate }]);
      } else {
        setHistory((prev) => [
          ...prev,
          { command: trimmed, output: `Command not found: ${trimmed}\nType 'help' for available commands.`, animated: false },
        ]);
      }
    },
    [COMMANDS, commandHistory]
  );

  // Keyboard handling
  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      executeCommand(input);
      setInput("");
      setShowSuggestions(false);
      return;
    }

    if (e.key === "Tab") {
      e.preventDefault();
      const matches = suggestionMatches;
      if (matches.length === 1) setInput(matches[0] + " ");
      else if (matches.length > 1) {
        setHistory((prev) => [...prev, { command: input, output: `Possible commands: ${matches.join(", ")}`, animated: false }]);
      }
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length === 0) return;
      const newIndex = historyIndex <= 0 ? commandHistory.length - 1 : historyIndex - 1;
      setHistoryIndex(newIndex);
      setInput(commandHistory[newIndex] || "");
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex === -1) return;
      const newIndex = historyIndex + 1;
      if (newIndex >= commandHistory.length) {
        setHistoryIndex(-1);
        setInput("");
      } else {
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      }
    }
  };

  // Typewriter renderer for animated outputs
  const RenderOutput: React.FC<{ item: HistoryItem }> = ({ item }) => {
    const [visibleText, setVisibleText] = useState<string>(typeof item.output === "string" ? "" : "");
    useEffect(() => {
      let mounted = true;
      if (!item.animated || typeof item.output !== "string") {
        // immediate
        setVisibleText(typeof item.output === "string" ? item.output : "");
        return;
      }

      // animate
      const txt = item.output;
      let i = 0;
      setVisibleText("");
      const step = () => {
        if (!mounted) return;
        i++;
        setVisibleText(txt.slice(0, i));
        if (i < txt.length) setTimeout(step, 8 + Math.random() * 20);
      };
      step();
      return () => {
        mounted = false;
      };
    }, [item]);

    if (typeof item.output === "string") return <div className="whitespace-pre-wrap">{visibleText || item.output}</div>;
    return <div>{item.output}</div>;
  };

  // derived theme classes
  const theme = THEMES[themeKey] || THEMES.default;

  return (
    <div
      className={`fixed z-40 w-[min(98vw,900px)] max-w-3xl`} 
      style={{ left: position.x || undefined, top: position.y || undefined }}
    >
      <div
        className={`rounded-lg overflow-hidden shadow-lg transition-all duration-200 ${theme.bg}`}
        style={{ boxShadow: "0 10px 25px rgba(0,0,0,0.4)" }}
      >
        {/* Header (draggable) */}
        <div
          ref={dragRef}
          className={`flex items-center justify-between px-3 py-2 cursor-grab select-none`}
          onDoubleClick={() => setIsExpanded((s) => !s)}
        >
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
            <div className={`font-mono text-sm ${theme.text}`}>enatan@portfolio:~$</div>
          </div>

          <div className="flex items-center gap-3">
            <div className={`text-xs font-mono ${theme.secondary}`}>theme: {themeKey}</div>
            <button
              onClick={() => setIsExpanded((s) => !s)}
              className={`text-xs font-mono ${theme.text} px-2 py-1 rounded hover:opacity-90`}
            >
              {isExpanded ? "[close]" : "[expand]"}
            </button>
          </div>
        </div>

        {/* Effects (non-critical) */}
        <TerminalGlowEffect />
        <TerminalPulseEffect />
        <TerminalEffects isActive={isExpanded} />

        {/* Session info */}
        <div className={`px-4 text-[11px] font-mono ${theme.secondary} flex gap-4`}> 
          <span>session: live</span>
          <span>user: root</span>
          <span>host: enatan.dev</span>
          <span>theme: {themeKey}</span>
        </div>

        {/* Body */}
        <AnimatePresence initial={false}>
          {isExpanded ? (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <div className="h-[520px] overflow-hidden flex">
                <div ref={terminalRef} className={`flex-1 p-4 overflow-y-auto font-mono text-sm ${theme.text}`}>
                  <div className={`space-y-3`}>
                    {history.map((item, idx) => (
                      <div key={`${item.command}-${idx}`}>
                        {item.command && <div className={`${theme.secondary} mb-1`}>$ {item.command}</div>}
                        <div className={`${theme.text} ml-4`}>{item.animated ? <RenderOutput item={item} /> : typeof item.output === "string" ? <div className="whitespace-pre-wrap">{item.output}</div> : item.output}</div>
                      </div>
                    ))}
                  </div>

                  {/* input */}
                  <div className="mt-4">
                    <div className={`flex items-center gap-3`}> 
                      <span className={`${theme.secondary}`}>$</span>
                      <input
                        ref={inputRef}
                        value={input}
                        onChange={(e) => {
                          setInput(e.target.value);
                          setShowSuggestions(true);
                        }}
                        onKeyDown={onKeyDown}
                        className={`flex-1 bg-transparent outline-none ${theme.text} font-mono text-sm`}
                        placeholder="Type 'help' for commands..."
                        spellCheck={false}
                        autoComplete="off"
                      />
                    </div>

                    {/* suggestions */}
                    {showSuggestions && suggestionMatches.length > 0 && (
                      <div className="mt-2 grid grid-cols-3 gap-2">
                        {suggestionMatches.map((s) => (
                          <button
                            key={s}
                            onClick={() => {
                              setInput(s + " ");
                              setShowSuggestions(false);
                              inputRef.current?.focus();
                            }}
                            className={`px-2 py-1 rounded text-xs font-mono ${theme.secondary} hover:opacity-90`}
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    )}

                    {/* quick theme buttons */}
                    <div className="mt-3 flex gap-2">
                      {Object.keys(THEMES).map((k) => (
                        <button
                          key={k}
                          onClick={() => {
                            setThemeKey(k);
                            lsSet("enatan_terminal_theme", k);
                          }}
                          className={`text-xs px-2 py-1 font-mono rounded ${themeKey === k ? "ring-2 ring-offset-1" : "opacity-80"}`}
                        >
                          {k}
                        </button>
                      ))}

                      <button
                        onClick={() => {
                          // boot sequence reset
                          lsSet("enatan_terminal_booted", "");
                          setIsBooting(true);
                        }}
                        className="ml-auto text-xs px-2 py-1 font-mono rounded"
                      >
                        Reboot UI
                      </button>
                    </div>

                    {/* footer small hint */}
                    <div className={`mt-3 text-[11px] ${theme.secondary} font-mono`}>Tip: press <kbd>Tab</kbd> to autocomplete, <kbd>↑</kbd>/<kbd>↓</kbd> for history, double-click header to toggle.</div>
                  </div>
                </div>

                {/* Right sidebar (compact) */}
                <div className="w-48 border-l px-3 py-4 hidden md:block" style={{ borderColor: "rgba(255,255,255,0.03)" }}>
                  <div className={`${theme.secondary} text-xs font-mono mb-2`}>Quick</div>
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => {
                        executeCommand("help");
                      }}
                      className={`text-xs font-mono ${theme.text} px-2 py-1 rounded`}
                    >
                      help
                    </button>

                    <button
                      onClick={() => {
                        executeCommand("projects");
                      }}
                      className={`text-xs font-mono ${theme.text} px-2 py-1 rounded`}
                    >
                      projects
                    </button>

                    <button
                      onClick={() => {
                        executeCommand("sysinfo");
                      }}
                      className={`text-xs font-mono ${theme.text} px-2 py-1 rounded`}
                    >
                      sysinfo
                    </button>

                    <button
                      onClick={() => {
                        executeCommand("users");
                      }}
                      className={`text-xs font-mono ${theme.text} px-2 py-1 rounded`}
                    >
                      users
                    </button>
                  </div>

                  <div className="mt-6 text-[12px] font-mono ${theme.secondary}">Theme preview</div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="collapsed"
              className={`p-4 cursor-pointer font-mono ${theme.secondary}`}
              onClick={() => setIsExpanded(true)}
            >
              <span className={`${theme.accent}`}>$</span> Interactive terminal - Click to expand and type commands
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
