"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";
import { motion } from "framer-motion";

const navItems = [
  { name: "🏠 Home", path: "/" },
  { name: "🚀 Projects", path: "/projects" },
  { name: "⚡ Skills", path: "/skills" },
  { name: "👨‍💻 About", path: "/about" },
  { name: "📝 Blog", path: "/blog" },
  { name: "📬 Contact", path: "/contact" },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="sticky top-0 z-50 glass backdrop-blur-2xl bg-light-bg/70 dark:bg-dark-bg/70 border-b border-light-border/50 dark:border-dark-border/50 shadow-lg"
    >
      <nav className="container-custom py-4">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="text-xl font-bold text-gradient hover:scale-110 transition-transform duration-300"
          >
            ED
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`text-sm font-medium transition-colors hover:text-accent ${
                  pathname === item.path
                    ? "text-accent"
                    : "text-light-text-secondary dark:text-dark-text-secondary"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          <ThemeToggle />
        </div>
      </nav>
    </motion.header>
  );
}
