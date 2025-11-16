"use client";

import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

type Output = string | JSX.Element;
interface HistoryItem {
  command: string;
  output: Output;
  animated?: boolean;
}

const ASCII_ART = `...`; // keep your ASCII art
const THEMES = { /* keep your theme object */ };

// Safe localStorage helpers
const lsGet = (k: string) => { try { return localStorage.getItem(k); } catch { return null; } };
const lsSet = (k: string, v: string) => { try { localStorage.setItem(k, v); } catch {} };

// Typewriter output component
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
  const [isExpanded, setIsExpanded] = useState(false);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<HistoryItem[]>(() => {
    const raw = lsGet("enatan_terminal_history");
    if (raw) try { return JSON.parse(raw); } catch {}
    return [{ command: "", output: ASCII_ART, animated: true }];
  });
  const [commandHistory, setCommandHistory] = useState<string[]>(() => {
    const raw = lsGet("enatan_terminal_cmds"); if (raw) try { return JSON.parse(raw); } catch {} return [];
  });
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [themeKey, setThemeKey] = useState<string>(() => lsGet("enatan_terminal_theme") || "default");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [position, setPosition] = useState<{ x: number; y: number }>(() => {
    const raw = lsGet("enatan_terminal_pos"); if (raw) try { return JSON.parse(raw); } catch {} return { x: 0, y: 0 };
  });

  const inputRef = useRef<HTMLInputElement | null>(null);
  const terminalRef = useRef<HTMLDivElement | null>(null);
  const dragRef = useRef<HTMLDivElement | null>(null);
  const dragData = useRef<{ dragging: boolean; startX: number; startY: number; origX: number; origY: number }>({
    dragging: false, startX: 0, startY: 0, origX: 0, origY: 0,
  });

  const theme = THEMES[themeKey] || THEMES.default;

  // Persist history
  useEffect(() => lsSet("enatan_terminal_history", JSON.stringify(history)), [history]);
  useEffect(() => lsSet("enatan_terminal_cmds", JSON.stringify(commandHistory)), [commandHistory]);

  // Focus input on expand
  useEffect(() => { if (isExpanded && inputRef.current) inputRef.current.focus(); }, [isExpanded]);

  // Scroll to bottom
  useEffect(() => { if (terminalRef.current) terminalRef.current.scrollTop = terminalRef.current.scrollHeight; }, [history]);

  // Drag functionality
  useEffect(() => {
    const el = dragRef.current; if (!el) return;
    const onPointerDown = (e: PointerEvent) => {
      dragData.current.dragging = true;
      dragData.current.startX = e.clientX;
      dragData.current.startY = e.clientY;
      dragData.current.origX = position.x;
      dragData.current.origY = position.y;
      el.setPointerCapture(e.pointerId);
    };
    const onPointerMove = (e: PointerEvent) => {
      if (!dragData.current.dragging) return;
      setPosition({ x: dragData.current.origX + e.clientX - dragData.current.startX, y: dragData.current.origY + e.clientY - dragData.current.startY });
    };
    const onPointerUp = (e: PointerEvent) => {
      dragData.current.dragging = false;
      try { el.releasePointerCapture(e.pointerId); } catch {}
      lsSet("enatan_terminal_pos", JSON.stringify(position));
    };
    el.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    return () => {
      el.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
    };
  }, [position]);

  // Example command execution (add your full COMMANDS here)
  const executeCommand = useCallback((rawInput: string) => {
    const trimmed = rawInput.trim();
    if (!trimmed) return;
    setCommandHistory(prev => [...prev, trimmed]);
    setHistoryIndex(-1);
    setHistory(prev => [...prev, { command: trimmed, output: `Executed: ${trimmed}`, animated: true }]);
    setInput("");
  }, []);

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") { executeCommand(input); setShowSuggestions(false); }
  };

  const availableCommandNames = ["help", "about", "skills", "projects", "contact", "resume"];
  const suggestionMatches = useMemo(() => {
    const trimmed = input.trim().toLowerCase();
    if (!trimmed || trimmed.includes(" ")) return [];
    return availableCommandNames.filter(c => c.startsWith(trimmed)).slice(0, 6);
  }, [input]);

  return (
    <div className={`fixed z-40 w-[min(98vw,900px)] max-w-3xl`} style={{ left: position.x, top: position.y }}>
      <div className={`rounded-lg overflow-hidden shadow-lg transition-all duration-200 ${theme.bg}`} style={{ boxShadow: "0 10px 25px rgba(0,0,0,0.4)" }}>
        {/* Header */}
        <div ref={dragRef} className="flex items-center justify-between px-4 py-3 cursor-grab select-none bg-gray-900/90" onDoubleClick={() => setIsExpanded(s => !s)}>
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

                  {/* Input */}
                  <div className="mt-4 flex flex-col">
                    <div className="flex items-center gap-3">
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
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
