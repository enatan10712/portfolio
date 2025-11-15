"use client";

import { useState, useEffect } from "react";

interface GlitchTextProps {
  text: string;
  className?: string;
}

export default function GlitchText({ text, className = "" }: GlitchTextProps) {
  const [glitching, setGlitching] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitching(true);
      setTimeout(() => setGlitching(false), 200);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <span className={`relative inline-block ${className}`}>
      <span
        className={`${glitching ? "glitch-animation" : ""}`}
        data-text={text}
      >
        {text}
      </span>
      <style jsx>{`
        .glitch-animation {
          position: relative;
          animation: glitch 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
        }

        .glitch-animation::before,
        .glitch-animation::after {
          content: attr(data-text);
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
        }

        .glitch-animation::before {
          animation: glitch-1 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
          color: #3dd4c9;
          z-index: -1;
        }

        .glitch-animation::after {
          animation: glitch-2 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
          color: #ff006e;
          z-index: -2;
        }

        @keyframes glitch {
          0%, 100% {
            transform: translate(0);
          }
          20% {
            transform: translate(-2px, 2px);
          }
          40% {
            transform: translate(-2px, -2px);
          }
          60% {
            transform: translate(2px, 2px);
          }
          80% {
            transform: translate(2px, -2px);
          }
        }

        @keyframes glitch-1 {
          0%, 100% {
            transform: translate(0);
          }
          33% {
            transform: translate(-4px, 0);
          }
          66% {
            transform: translate(4px, 0);
          }
        }

        @keyframes glitch-2 {
          0%, 100% {
            transform: translate(0);
          }
          33% {
            transform: translate(4px, 0);
          }
          66% {
            transform: translate(-4px, 0);
          }
        }
      `}</style>
    </span>
  );
}
