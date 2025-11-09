// Design tokens for the portfolio
// Easy customization point for theme tweaks

export const colors = {
  dark: {
    background: '#0b0f14',
    surface: '#151a21',
    surfaceHover: '#1a2028',
    primary: '#e6eef6',
    secondary: '#8b95a3',
    accent: '#3dd4c9',
    accentHover: '#2ec4b9',
    border: '#1f2937',
    borderLight: '#374151',
  },
  light: {
    background: '#ffffff',
    surface: '#f9fafb',
    surfaceHover: '#f3f4f6',
    primary: '#111827',
    secondary: '#6b7280',
    accent: '#0891b2',
    accentHover: '#0e7490',
    border: '#e5e7eb',
    borderLight: '#d1d5db',
  },
};

export const spacing = {
  xs: '0.5rem',    // 8px
  sm: '0.75rem',   // 12px
  md: '1rem',      // 16px
  lg: '1.5rem',    // 24px
  xl: '2rem',      // 32px
  '2xl': '3rem',   // 48px
  '3xl': '4rem',   // 64px
  '4xl': '6rem',   // 96px
};

export const typography = {
  fontFamily: {
    headline: 'var(--font-inter)',
    body: 'var(--font-inter)',
  },
  fontSize: {
    xs: '0.75rem',     // 12px
    sm: '0.875rem',    // 14px
    base: '1rem',      // 16px
    lg: '1.125rem',    // 18px
    xl: '1.25rem',     // 20px
    '2xl': '1.5rem',   // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem',  // 36px
    '5xl': '3rem',     // 48px
    '6xl': '3.75rem',  // 60px
  },
  fontWeight: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
  lineHeight: {
    tight: '1.25',
    normal: '1.5',
    relaxed: '1.75',
  },
  letterSpacing: {
    tight: '-0.025em',
    normal: '0',
    wide: '0.025em',
    wider: '0.05em',
  },
};

export const layout = {
  maxWidth: '1100px',
  containerPadding: {
    mobile: '1.5rem',
    desktop: '2rem',
  },
  borderRadius: {
    sm: '0.375rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem',
  },
};

export const animation = {
  duration: {
    fast: '150ms',
    normal: '250ms',
    slow: '350ms',
  },
  easing: {
    smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
    bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  },
};
