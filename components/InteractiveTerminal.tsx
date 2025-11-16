"use client";

import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

// -----------------------------
// InteractiveTerminal (single-file React component)
// Features: autocomplete with highlights, typewriter outputs, themes, draggable, history, clean Vercel build
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
  try { return localStorage.getItem(k); } catch { return null; }
};
const lsSet = (k: string, v: string) => {
  try { localStorage.setItem(k, v); } catch {}
};

export default function InteractiveTerminal() {
  // state
  const [isExpanded, setIsExpanded] = useState(false);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<HistoryItem[]>(() => {
    const raw = lsGet("enatan_terminal_history");
    if (raw) {
      try { return JSON.parse(raw); } catch { return []; }
    }
    const welcomeMessage = `
╔══════════════════════════════════════════╗
║   Welcome to Enatan's Portfolio Terminal! ║
║   Last login: ${new Date().toLocaleString()}    ║
╚══════════════════════════════════════════╝

Type 'help' to see available commands.`;
    return [{ command: "", output: welcomeMessage, animated: true }];
  });
  const [commandHistory, setCommandHistory] = useState<string[]>(() => {
    const raw = lsGet("enatan_terminal_cmds");
    if (raw) { try { return JSON.parse(raw); } catch { return []; } }
    return [];
  });
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [themeKey, setThemeKey] = useState<string>(() => lsGet("enatan_terminal_theme") || "default");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isTypingOutput, setIsTypingOutput] = useState(false);
  const [position, setPosition] = useState<{ x: number; y: number }>(() => {
    const raw = lsGet("enatan_terminal_pos");
    if (raw) { try { return JSON.parse(raw); } catch { return { x: 0, y: 0 }; } }
    return { x: 0, y: 0 };
  });

  const inputRef = useRef<HTMLInputElement | null>(null);
  const terminalRef = useRef<HTMLDivElement | null>(null);
  const dragRef = useRef<HTMLDivElement | null>(null);
  const dragData = useRef<{ dragging: boolean; startX: number; startY: number; origX: number; origY: number }>({
    dragging: false, startX: 0, startY: 0, origX: 0, origY: 0,
  });

  // Commands
  const COMMANDS = useMemo(() => {
    return {
      help: () => `Available commands (type 'help <command>' for details):
  • help       - Show this help message
  • about      - About me
  • skills     - My technical skills
  • projects   - View my projects
  • contact    - Contact information
  • resume     - Download my resume
  • experience - Work experience
  • clear      - Clear terminal
  • theme      - Change terminal theme
  • whoami     - Show current user
  • date       - Show current date & time
  • history    - Command history
  • banner     - Show welcome banner
  • sysinfo    - System information`,
      'help about': () => 'about - Displays information about me, my background, and current focus.',
      'help skills': () => 'skills - Lists my technical skills and areas of expertise.',
      'help projects': () => 'projects - Shows information about my featured projects.',
      'help contact': () => 'contact - Displays my contact information.',
      'help theme': () => 'theme [name] - Change terminal theme. Available themes: ' + Object.keys(THEMES).join(', '),
      about: () => `Enatan Dereje\nData Scientist • Web Pentester • Developer\nLocation: Ethiopia\nOpen to opportunities`,
      skills: () => `Python, React, Security, ML/AI, Docker, AWS, Data Science`,
      projects: () => (
        <div>
          Featured Projects:<br />
          1. Forex Predictor – ML trading system (12% ROI)<br />
          2. Medical Diagnosis – 94% accuracy ML model<br />
          3. Security Scanner – OWASP Top 10 detection<br />
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
        const key = args?.[0]?.toLowerCase();
        if (!key) return `Available themes: ${Object.keys(THEMES).join(", ")}. Current: ${themeKey}`;
        if (!THEMES[key]) return `Theme not found: ${key}`;
        setThemeKey(key); lsSet("enatan_terminal_theme", key);
        return `Theme set to ${key}`;
      },
      sudo: (args?: string[]) => {
        const cmd = args?.join(" ") || "";
        if (cmd.includes("rm -rf") || cmd.includes("format")) return `Error: Nice try. Destructive operations are disabled. 😈`;
        return `root password required for '${cmd}'\nError: Permission denied.`;
      },
      sysinfo: () => {
        const nav = typeof navigator !== "undefined" ? navigator : {} as any;
        return `System Info:\nUser Agent: ${nav.userAgent || "unknown"}\nPlatform: ${nav.platform || "unknown"}\nLanguages: ${nav.language || "unknown"}`;
      },
      users: () => `root\ndaemon\nwww-data\nenatan (you)\nguest`,
    } as Record<string, ((args?: string[]) => string | JSX.Element)>;
  }, [themeKey]);

  const availableCommandNames = useMemo(() => Object.keys(COMMANDS), [COMMANDS]);

  // Suggestions with highlights
  const suggestionMatches = useMemo(() => {
    const trimmed = input.trim().toLowerCase();
    if (!trimmed || trimmed.includes(" ")) return [];
    return availableCommandNames.filter(c => c.startsWith(trimmed)).slice(0, 6);
  }, [input, availableCommandNames]);

  // Persist history
  useEffect(() => { lsSet("enatan_terminal_history", JSON.stringify(history)); }, [history]);
  useEffect(() => { lsSet("enatan_terminal_cmds", JSON.stringify(commandHistory)); }, [commandHistory]);

  // Focus input
  useEffect(() => { if (isExpanded && inputRef.current) inputRef.current.focus(); }, [isExpanded]);

  // Scroll to bottom
  useEffect(() => { if (terminalRef.current) terminalRef.current.scrollTop = terminalRef.current.scrollHeight; }, [history]);

  // Drag
  useEffect(() => {
    const el = dragRef.current;
    if (!el) return;
    const onPointerDown = (e: PointerEvent) => { dragData.current.dragging = true; dragData.current.startX = e.clientX; dragData.current.startY = e.clientY; dragData.current.origX = position.x; dragData.current.origY = position.y; el.setPointerCapture(e.pointerId); };
    const onPointerMove = (e: PointerEvent) => {
      if (!dragData.current.dragging) return;
      setPosition({ x: dragData.current.origX + e.clientX - dragData.current.startX, y: dragData.current.origY + e.clientY - dragData.current.startY });
    };
    const onPointerUp = (e: PointerEvent) => { dragData.current.dragging = false; try { el.releasePointerCapture(e.pointerId); } catch {} lsSet("enatan_terminal_pos", JSON.stringify(position)); };
    el.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    return () => { el.removeEventListener("pointerdown", onPointerDown); window.removeEventListener("pointermove", onPointerMove); window.removeEventListener("pointerup", onPointerUp); };
  }, [position]);

  // Execute command
  const executeCommand = useCallback((rawInput: string) => {
    const trimmed = rawInput.trim();
    if (!trimmed) return;
    setCommandHistory(prev => [...prev, trimmed]);
    setHistoryIndex(-1);

    if (trimmed.toLowerCase().startsWith("echo ")) {
      const out = trimmed.slice(5);
      setHistory(prev => [...prev, { command: trimmed, output: out, animated: false }]);
      return;
    }
    if (trimmed.toLowerCase() === "clear") { setHistory([]); return; }
    if (trimmed.toLowerCase() === "history") { setHistory(prev => [...prev, { command: trimmed, output: commandHistory.join("\n") || "No commands executed yet.", animated: false }]); return; }

    const parts = trimmed.split(/\s+/);
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1);

    const handler = (COMMANDS as any)[cmd];
    if (handler) {
      const shouldAnimate = cmd !== "projects" && cmd !== "contact" && cmd !== "resume";
      const result = handler(args);
      setHistory(prev => [...prev, { command: trimmed, output: result, animated: shouldAnimate }]);
    } else {
      setHistory(prev => [...prev, { command: trimmed, output: `Command not found: ${trimmed}`, animated: false }]);
    }
  }, [COMMANDS, commandHistory]);

  // Keyboard
  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") { executeCommand(input); setInput(""); setShowSuggestions(false); return; }
    if (e.key === "Tab") {
      e.preventDefault();
      const matches = suggestionMatches;
      if (matches.length === 1) setInput(matches[0] + " ");
      else if (matches.length > 1) setHistory(prev => [...prev, { command: input, output: `Possible commands: ${matches.join(", ")}`, animated: false }]);
    }
    if (e.key === "ArrowUp") { e.preventDefault(); if (!commandHistory.length) return; const idx = historyIndex <= 0 ? commandHistory.length - 1 : historyIndex - 1; setHistoryIndex(idx); setInput(commandHistory[idx] || ""); }
    if (e.key === "ArrowDown") { e.preventDefault(); if (historyIndex === -1) return; const idx = historyIndex + 1; if (idx >= commandHistory.length) { setHistoryIndex(-1); setInput(""); } else { setHistoryIndex(idx); setInput(commandHistory[idx]); } }
  };

  // Typewriter output
  const renderOutput = (item: HistoryItem, index: number) => {
    const [visibleText, setVisibleText] = useState<string>(typeof item.output === "string" ? "" : "");
    useEffect(() => {
      let mounted = true;
      if (!item.animated || typeof item.output !== "string") { setVisibleText(typeof item.output === "string" ? item.output : ""); return; }
      const txt = item.output;
      let i = 0;
      setVisibleText("");
      const step = () => { if (!mounted) return; i++; setVisibleText(txt.slice(0, i)); if (i < txt.length) setTimeout(step, 8 + Math.random() * 20); };
      step();
      return () => { mounted = false; };
    }, [item]);
    return <div className="whitespace-pre-wrap">{typeof item.output === "string" ? visibleText : item.output}</div>;
  };

  const theme = THEMES[themeKey] || THEMES.default;

  return (
    <div className={`fixed z-40 w-[min(98vw,900px)] max-w-3xl`} style={{ left: position.x, top: position.y }}>
      <div className={`rounded-lg overflow-hidden shadow-lg transition-all duration-200 ${theme.bg}`} style={{ boxShadow: "0 10px 25px rgba(0,0,0,0.4)" }}>
        {/* Header */}
        <div 
          ref={dragRef} 
          className={`flex items-center justify-between px-4 py-3 cursor-grab select-none bg-gray-900/90`} 
          onDoubleClick={() => setIsExpanded(s => !s)}
        >
          <div className="flex items-center space-x-2">
            <div className="flex space-x-1.5 mr-3">
              <div className="w-3 h-3 rounded-full bg-red-500/90 hover:bg-red-400 transition-colors" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/90 hover:bg-yellow-400 transition-colors" />
              <div className="w-3 h-3 rounded-full bg-green-500/90 hover:bg-green-400 transition-colors" />
            </div>
            <div className={`p-4 font-mono text-sm ${theme.text} overflow-y-auto terminal-scrollbar`} 
              style={{ 
                height: isExpanded ? '70vh' : '400px',
                background: 'rgba(17, 24, 39, 0.6)',
                backgroundImage: 'linear-gradient(to bottom, rgba(255,255,255,0.02) 0%, transparent 1px, transparent 100%)',
                backgroundSize: '100% 1.5em',
                backgroundPosition: '0 0.5em',
                lineHeight: '1.5em'
              }}
            >
              <div className="space-y-2">
                {history.map((item, i) => (
                  <div key={i} className="terminal-line">
                    {item.command && (
                      <div className="flex items-start">
                        <span className="text-green-400">$</span>
                        <span className="ml-2 text-gray-300">{item.command}</span>
                      </div>
                    )}
                    {renderOutput(item, i)}
                  </div>
                ))}
              </div>

              <div className="flex items-center mt-4">
                <div className="relative flex-1 group">
                  <div className="absolute inset-0 bg-accent/10 rounded opacity-0 group-focus-within:opacity-100 transition-opacity"></div>
                  <div className="flex items-center relative">
                    <span className="text-green-400">$</span>
                    <div className="relative flex-1 ml-2">
                      <input
                        ref={inputRef}
                        type="text"
                        value={input}
                        onChange={(e) => {
                          setInput(e.target.value);
                          setShowSuggestions(true);
                        }}
                        className="w-full bg-transparent border-none outline-none text-gray-100 placeholder-gray-500 caret-green-400"
                        placeholder="Type 'help' for commands"
                        spellCheck={false}
                        autoComplete="off"
                        onKeyDown={onKeyDown}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={`flex items-center gap-3`}>
              <div className={`text-xs font-mono ${theme.secondary}`}>theme: {themeKey}</div>
              <button onClick={() => setIsExpanded(s => !s)} className={`text-xs font-mono ${theme.text} px-2 py-1 rounded hover:opacity-90`}>
                {isExpanded ? "[close]" : "[expand]"}
              </button>
            </div>
          </div>
        </div>

        {/* Body */}
        <AnimatePresence initial={false}>
          {isExpanded && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }}>
              <div className="h-[520px] overflow-hidden flex">
                <div ref={terminalRef} className={`flex-1 p-4 overflow-y-auto font-mono text-sm ${theme.text}`}>
                  <div className="space-y-3">
                    {history.map((item, idx) => (
                      <div key={`${item.command}-${idx}`}>
                        {item.command && <div className={`${theme.secondary} mb-1`}>$ {item.command}</div>}
                        <div className={`${theme.text} ml-4`}>
                          {item.animated ? <RenderOutput item={item} /> : typeof item.output === "string" ? <div className="whitespace-pre-wrap">{item.output}</div> : item.output}
                        </div>
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
                        onChange={e => { setInput(e.target.value); setShowSuggestions(true); }}
                        onKeyDown={onKeyDown}
                        className={`flex-1 bg-transparent outline-none ${theme.text} font-mono text-sm`}
                        placeholder="Type 'help' for commands..."
                        spellCheck={false}
                        autoComplete="off"
                      />
                    </div>

                    {/* suggestions with highlights */}
                    {showSuggestions && suggestionMatches.length > 0 && (
                      <div className="mt-1 bg-black/50 p-1 rounded text-xs grid grid-cols-3 gap-1">
                        {suggestionMatches.map(s => {
                          const matchIndex = s.toLowerCase().indexOf(input.toLowerCase());
                          const before = s.slice(0, matchIndex);
                          const match = s.slice(matchIndex, matchIndex + input.length);
                          const after = s.slice(matchIndex + input.length);
                          return (
                            <button key={s} className={`${theme.secondary} hover:text-accent text-left`}
                              onClick={() => { setInput(s + " "); setShowSuggestions(false); inputRef.current?.focus(); }}>
                              <span>{before}</span><span className="text-accent font-bold">{match}</span><span>{after}</span>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
