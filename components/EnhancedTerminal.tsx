"use client";

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  playTypingSound, 
  playClickSound,
  playNotificationSound 
} from '@/lib/sounds';
import { playMidiClick, playMidiNotification } from '@/lib/midiSounds';

interface Command {
  command: string;
  output: string | JSX.Element;
  timestamp: number;
}

const COMMANDS = {
  help: {
    description: 'Show available commands',
    action: () => (
      `Available commands:\n` +
      `  help       - Show this help message\n` +
      `  about      - About me\n` +
      `  skills     - List my technical skills\n` +
      `  projects   - Show my projects\n` +
      `  contact    - Get in touch\n` +
      `  clear      - Clear the terminal\n` +
      `  theme      - Change terminal theme\n`
    ),
  },
  // add more commands here...
};

type Theme = 'matrix' | 'cyberpunk';

export default function EnhancedTerminal() {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<Command[]>([]);
  const [theme, setTheme] = useState<Theme>('matrix');
  const [isFocused, setIsFocused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isAudioEnabled, setIsAudioEnabled] = useState(false);

  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Unlock audio on first interaction
  useEffect(() => {
    const enableAudio = () => {
      setIsAudioEnabled(true);
      const audio = new Audio('data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAADAAEARKwAAIhYAQACABAAZGF0YQQ=');
      audio.volume = 0.001;
      audio.play().catch(() => console.log('Audio play prevented'));
      window.removeEventListener('click', enableAudio);
      window.removeEventListener('keydown', enableAudio);
      window.removeEventListener('touchstart', enableAudio);
    };
    window.addEventListener('click', enableAudio, { once: true });
    window.addEventListener('keydown', enableAudio, { once: true });
    window.addEventListener('touchstart', enableAudio, { once: true });
    return () => {
      window.removeEventListener('click', enableAudio);
      window.removeEventListener('keydown', enableAudio);
      window.removeEventListener('touchstart', enableAudio);
    };
  }, []);

  const themes = {
    matrix: { bg: 'bg-black/90', text: 'text-green-400', border: 'border-green-500/30', header: 'bg-black/80 border-green-500/20' },
    cyberpunk: { bg: 'bg-gray-900/95', text: 'text-pink-400', border: 'border-pink-500/30', header: 'bg-gray-900/80 border-pink-500/20' },
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const command = input.trim().toLowerCase();
    const output = COMMANDS[command as keyof typeof COMMANDS]?.action() || 
      `Command not found: ${command}\nType 'help' for available commands.`;

    setHistory(prev => [
      ...prev, 
      { command: input, output, timestamp: Date.now() }
    ]);

    setInput('');

    if (isAudioEnabled) playClickSound().catch(() => playMidiClick());
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!terminalRef.current) return;

    const rect = terminalRef.current.getBoundingClientRect();
    setDragStart({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    setIsDragging(true);

    if (isAudioEnabled) playClickSound().catch(() => playMidiClick());
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPosition({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y });
  };

  const handleMouseUp = () => setIsDragging(false);

  const changeTheme = (newTheme: Theme) => {
    setTheme(newTheme);
    if (isAudioEnabled) playNotificationSound().catch(() => playMidiNotification());
  };

  return (
    <motion.div
      ref={terminalRef}
      className={`fixed bottom-8 right-8 w-[800px] h-[500px] rounded-lg overflow-hidden shadow-2xl border-2 ${themes[theme].border} ${themes[theme].bg} backdrop-blur-sm`}
      style={{ x: position.x, y: position.y, cursor: isDragging ? 'grabbing' : 'default', zIndex: 1000 }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Terminal Header */}
      <div className={`flex items-center justify-between px-4 py-2 ${themes[theme].header} border-b ${themes[theme].border} cursor-move`}>
        <span className="text-xs text-gray-400">terminal</span>
        <select value={theme} onChange={(e) => changeTheme(e.target.value as Theme)} className="text-xs bg-black/30 text-white border border-gray-600 rounded px-2 py-1">
          {Object.keys(themes).map(t => <option key={t} value={t}>{t}</option>)}
        </select>
      </div>

      {/* Terminal Content */}
      <div className={`h-[calc(100%-40px)] p-4 overflow-y-auto font-mono text-sm ${themes[theme].text}`} onClick={() => inputRef.current?.focus()}>
        {history.length === 0 && (
          <div className="mb-4">
            <div className="text-2xl font-bold mb-2">Welcome to My Portfolio</div>
            <div className="text-gray-400 mb-4">Type 'help' to see available commands</div>
          </div>
        )}

        {history.map((item, index) => (
          <div key={index} className="mb-4">
            <div className="flex items-center">
              <span className="text-green-400">$</span>
              <span className="ml-2">{item.command}</span>
            </div>
            <div className="mt-1 whitespace-pre-wrap">{item.output}</div>
          </div>
        ))}

        {/* Input area */}
        <form onSubmit={handleSubmit} className="flex items-center mt-4">
          <span className="text-green-400">$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              if (e.target.value.length > 0) playTypingSound().catch(() => {});
            }}
            className={`bg-transparent border-none outline-none ml-2 w-full ${themes[theme].text} caret-green-400`}
            autoFocus
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
        </form>
      </div>
    </motion.div>
  );
}
