"use client";

import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";

type Output = string | JSX.Element;
interface HistoryItem {
  command: string;
  output: Output;
  animated?: boolean;
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
  dracula: { bg: "bg-[#282a36]", accent: "#bd93f9", text: "text-[#f8f8f2]", secondary: "#6272a4" },
  neon: { bg: "bg-[#050406]", accent: "#00f5ff", text: "#e6f7ff", secondary: "#8bdcff" },
  matrix: { bg: "bg-[#07190b]", accent: "#00ff41", text: "#dfffd8", secondary: "#6fbf6f" },
  nord: { bg: "bg-[#2e3440]", accent: "#88c0d0", text: "#eceff4", secondary: "#93a3b3" },
};

// Safe localStorage helpers
const lsGet = (k: string) => { try { return localStorage.getItem(k); } catch { return null; } };
const lsSet = (k: string, v: string) => { try { localStorage.setItem(k, v); } catch {} };

// Typewriter output
const RenderOutput: React.FC<{ item: HistoryItem }> = ({ item }) => {
  const [visibleText, setVisibleText] = useState<string>(typeof item.output === "string" ? "" : "");

  useEffect(() => {
    let mounted = true;
    if (!item.animated || typeof item.output !== "string") {
      setVisibleText(typeof item.output === "string" ? item.output : "");
      return;
    }
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
    return () => { mounted = false; };
  }, [item]);

  return <div className="whitespace-pre-wrap">{typeof item.output === "string" ? visibleText : item.output}</div>;
};

export default function InteractiveTerminal() {
  const [isExpanded, setIsExpanded] = useState(true);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<HistoryItem[]>(() => {
    const raw = lsGet("terminal_history");
    if (raw) try { return JSON.parse(raw); } catch {}
    return [{ command: "", output: ASCII_ART, animated: true }];
  });
  const [commandHistory, setCommandHistory] = useState<string[]>(() => {
    const raw = lsGet("terminal_cmds"); if (raw) try { return JSON.parse(raw); } catch {} return [];
  });
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [themeKey, setThemeKey] = useState<string>(() => lsGet("terminal_theme") || "default");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const terminalRef = useRef<HTMLDivElement | null>(null);

  const theme = THEMES[themeKey] || THEMES["default"];

  // Persist history
  useEffect(() => lsSet("terminal_history", JSON.stringify(history)), [history]);
  useEffect(() => lsSet("terminal_cmds", JSON.stringify(commandHistory)), [commandHistory]);

  // Focus input
  useEffect(() => { if (inputRef.current) inputRef.current.focus(); }, [isExpanded]);

  // Scroll to bottom smoothly
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTo({ top: terminalRef.current.scrollHeight, behavior: "smooth" });
    }
  }, [history]);

  // Execute command
  const executeCommand = useCallback((rawInput: string) => {
    const trimmed = rawInput.trim();
    if (!trimmed) return;
    setCommandHistory(prev => [...prev, trimmed]);
    setHistoryIndex(-1);
    // Example: echo command
    if (trimmed.toLowerCase().startsWith("echo ")) {
      setHistory(prev => [...prev, { command: trimmed, output: trimmed.slice(5), animated: false }]);
      setInput("");
      return;
    }
    setHistory(prev => [...prev, { command: trimmed, output: `Executed: ${trimmed}`, animated: true }]);
    setInput("");
  }, []);

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") { executeCommand(input); setShowSuggestions(false); }
    if (e.key === "ArrowUp") { e.preventDefault(); if (!commandHistory.length) return; const idx = historyIndex <= 0 ? commandHistory.length - 1 : historyIndex - 1; setHistoryIndex(idx); setInput(commandHistory[idx] || ""); }
    if (e.key === "ArrowDown") { e.preventDefault(); if (historyIndex === -1) return; const idx = historyIndex + 1; if (idx >= commandHistory.length) { setHistoryIndex(-1); setInput(""); } else { setHistoryIndex(idx); setInput(commandHistory[idx]); } }
  };

  const availableCommandNames = ["help", "about", "skills", "projects", "contact", "resume"];
  const suggestionMatches = useMemo(() => {
    const trimmed = input.trim().toLowerCase();
    if (!trimmed || trimmed.includes(" ")) return [];
    return availableCommandNames.filter(c => c.startsWith(trimmed)).slice(0, 6);
  }, [input]);

  return (
    <div className={`fixed z-40 w-[min(98vw,900px)] max-w-3xl top-10 left-1/2 -translate-x-1/2`}>
      <div className={`rounded-lg overflow-hidden shadow-lg transition-all duration-200 ${theme.bg}`} style={{ boxShadow: "0 10px 25px rgba(0,0,0,0.4)" }}>
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-gray-900/90">
          <div className="flex items-center space-x-2">
            <div className="flex space-x-1.5 mr-3">
              <div className="w-3 h-3 rounded-full bg-red-500/90" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/90" />
              <div className="w-3 h-3 rounded-full bg-green-500/90" />
            </div>
            <div className={`text-xs font-mono ${theme.secondary}`}>theme: {themeKey}</div>
            <button onClick={() => setIsExpanded(s => !s)} className={`text-xs font-mono ${theme.text} px-2 py-1 rounded hover:opacity-90`}>
              {isExpanded ? "[close]" : "[expand]"}
            </button>
          </div>
        </div>

        {/* Terminal Body */}
        <AnimatePresence initial={false}>
          {isExpanded && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }}>
              <div ref={terminalRef} className="h-[520px] overflow-auto flex flex-col p-4 font-mono text-sm space-y-3">
                {history.map((item, idx) => (
                  <div key={`${item.command}-${idx}`}>
                    {item.command && <div className={`${theme.secondary} mb-1`}>$ {item.command}</div>}
                    <div className={`${theme.text} ml-4`}>
                      {item.animated ? <RenderOutput item={item} /> : typeof item.output === "string" ? <div className="whitespace-pre-wrap">{item.output}</div> : item.output}
                    </div>
                  </div>
                ))}

                {/* Input */}
                <div className="mt-4 flex items-center gap-3">
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

                {/* Suggestions */}
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
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
