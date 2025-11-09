/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Dark theme
        'dark-bg': '#0b0f14',
        'dark-surface': '#151a21',
        'dark-surface-hover': '#1a2028',
        'dark-text': '#e6eef6',
        'dark-text-secondary': '#8b95a3',
        'dark-border': '#1f2937',
        'dark-border-light': '#374151',
        // Light theme
        'light-bg': '#ffffff',
        'light-surface': '#f9fafb',
        'light-surface-hover': '#f3f4f6',
        'light-text': '#111827',
        'light-text-secondary': '#6b7280',
        'light-border': '#e5e7eb',
        'light-border-light': '#d1d5db',
        // Accent
        'accent': '#3dd4c9',
        'accent-hover': '#2ec4b9',
        'accent-light': '#0891b2',
        'accent-light-hover': '#0e7490',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        'content': '1100px',
      },
      letterSpacing: {
        'wider': '0.05em',
      },
      animation: {
        'fade-up': 'fadeUp 0.5s ease-out',
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'count-up': 'countUp 2s ease-out',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
