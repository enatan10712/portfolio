"use client";

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { 
  playTypingSound, 
  playSuccessSound, 
  playErrorSound, 
  playClickSound,
  playNotificationSound 
} from '@/lib/sounds';
import { 
  playMidiClick, 
  playMidiTyping, 
  playMidiSuccess, 
  playMidiError, 
  playMidiNotification 
} from '@/lib/midiSounds';

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
  // ... other commands
};

type Theme = 'matrix' | 'cyberpunk' | 'ocean' | 'solarized' | 'dracula';

theme: Theme;

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

  // Initialize audio on first interaction
  useEffect(() => {
    const enableAudio = () => {
      setIsAudioEnabled(true);
      // Play a silent sound to unlock audio
      const audio = new Audio('data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAADAAEARKwAAIhYAQACABAAZGF0YQQ=');
      audio.volume = 0.001; // Almost silent
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          console.log('Audio play was prevented');
        });
      }
      
      // Remove event listeners after first interaction
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

  // Theme configurations
  const themes = {
    matrix: {
      bg: 'bg-black/90',
      text: 'text-green-400',
      border: 'border-green-500/30',
      accent: 'text-green-400',
      header: 'bg-black/80 border-green-500/20',
      content: 'from-green-900/10 to-black/90',
    },
    cyberpunk: {
      bg: 'bg-gray-900/95',
      text: 'text-pink-400',
      border: 'border-pink-500/30',
      accent: 'text-cyan-400',
      header: 'bg-gray-900/80 border-pink-500/20',
      content: 'from-pink-900/10 to-gray-900/90',
    },
    // Add more themes...
  };

  // Matrix rain effect
  useEffect(() => {
    if (theme === 'matrix' && terminalRef.current) {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      canvas.style.position = 'absolute';
      canvas.style.top = '0';
      canvas.style.left = '0';
      canvas.style.width = '100%';
      canvas.style.height = '100%';
      canvas.style.opacity = '0.1';
      canvas.style.pointerEvents = 'none';
      terminalRef.current.appendChild(canvas);

      const resizeCanvas = () => {
        if (terminalRef.current) {
          canvas.width = terminalRef.current.offsetWidth;
          canvas.height = terminalRef.current.offsetHeight;
        }
      };

      const chars = '01';
      const fontSize = 14;
      const columns = Math.floor(window.innerWidth / fontSize);
      const drops: number[] = Array(columns).fill(0);

      const draw = () => {
        if (!ctx) return;
        
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#0f0';
        ctx.font = `${fontSize}px monospace`;

        for (let i = 0; i < drops.length; i++) {
          const text = chars[Math.floor(Math.random() * chars.length)];
          ctx.fillText(text, i * fontSize, drops[i] * fontSize);
          
          if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
          }
          
          drops[i]++;
        }
      };

      resizeCanvas();
      window.addEventListener('resize', resizeCanvas);
      
      const interval = setInterval(draw, 50);
      
      return () => {
        window.removeEventListener('resize', resizeCanvas);
        clearInterval(interval);
        if (terminalRef.current?.contains(canvas)) {
          terminalRef.current.removeChild(canvas);
        }
      };
    }
  }, [theme]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const command = input.trim().toLowerCase();
    const output = COMMANDS[command as keyof typeof COMMANDS]?.action() || 
      `Command not found: ${command}\nType 'help' for available commands.`;

    setHistory(prev => [
      ...prev, 
      { 
        command: input, 
        output,
        timestamp: Date.now()
      }
    ]);
    
    setInput('');
    if (isAudioEnabled) {
      try {
        await playClickSound();
      } catch (error) {
        console.log('Falling back to MIDI click');
        playMidiClick();
      }
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!terminalRef.current) return;
    
    const rect = terminalRef.current.getBoundingClientRect();
    setDragStart({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
    
    setIsDragging(true);
    if (isAudioEnabled) {
      try {
        await playClickSound();
      } catch (error) {
        console.log('Falling back to MIDI click');
        playMidiClick();
      }
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !terminalRef.current) return;
    
    setPosition({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const changeTheme = (newTheme: Theme) => {
    setTheme(newTheme);
    if (isAudioEnabled) {
      playNotificationSound().catch(() => {
        console.log('Falling back to MIDI notification');
        playMidiNotification();
      });
    }
  };

  return (
    <motion.div
      ref={terminalRef}
      className={`fixed bottom-8 right-8 w-[800px] h-[500px] rounded-lg overflow-hidden shadow-2xl border-2 ${themes[theme].border} ${themes[theme].bg} backdrop-blur-sm`}
      style={{
        x: position.x,
        y: position.y,
        zIndex: 1000,
        cursor: isDragging ? 'grabbing' : 'default',
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      drag={isDragging}
      dragConstraints={{
        top: -window.innerHeight + 100,
        left: -window.innerWidth + 100,
        right: window.innerWidth - 100,
        bottom: window.innerHeight - 100,
      }}
      dragElastic={0.1}
      dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
    >
      {/* Terminal Header */}
      <div 
        className={`flex items-center justify-between px-4 py-2 ${themes[theme].header} border-b ${themes[theme].border} cursor-move`}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="flex items-center space-x-2">
          <div className="flex space-x-2">
            <button 
              className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400 transition-colors"
              onClick={async () => {
                if (isAudioEnabled) {
                  try {
                    await playClickSound();
                  } catch (error) {
                    console.log('Falling back to MIDI click');
                    playMidiClick();
                  }
                }
                // Close terminal
              }}
            />
            <button 
              className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-400 transition-colors"
              onClick={() => {
                if (isAudioEnabled) {
                  playClickSound().catch(console.error);
                }
                // Minimize terminal
              }}
            />
            <button 
              className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-400 transition-colors"
              onClick={() => {
                if (isAudioEnabled) {
                  playClickSound().catch(console.error);
                }
                // Execute a command
              }}
            />
          </div>
          <span className="text-xs text-gray-400 ml-2">terminal</span>
        </div>
        
        <div className="flex items-center space-x-2">
          <select
            value={theme}
            onChange={(e) => changeTheme(e.target.value as Theme)}
            className="text-xs bg-black/30 text-white border border-gray-600 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            {Object.keys(themes).map((t) => (
              <option key={t} value={t} className="bg-gray-900">
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Terminal Content */}
      <div 
        className={`h-[calc(100%-40px)] p-4 overflow-y-auto font-mono text-sm ${themes[theme].text} relative`}
        onClick={() => inputRef.current?.focus()}
      >
        {/* Matrix rain is added here via useEffect */}
        
        {/* Welcome message */}
        {history.length === 0 && (
          <div className="mb-4">
            <div className="text-2xl font-bold mb-2">Welcome to My Portfolio</div>
            <div className="text-gray-400 mb-4">Type 'help' to see available commands</div>
          </div>
        )}

        {/* Command history */}
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
              if (e.target.value.length > 0) {
                playTypingSound();
              }
            }}
            className={`bg-transparent border-none outline-none ml-2 w-full ${themes[theme].text} caret-green-400`}
            autoFocus
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
          <div className={`h-5 w-2 ml-2 bg-green-400 ${isFocused ? 'opacity-100' : 'opacity-0'} transition-opacity`} />
        </form>
      </div>
    </motion.div>
  );
}
