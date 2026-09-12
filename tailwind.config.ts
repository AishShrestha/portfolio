import type { Config } from 'tailwindcss';

const config: Config = {
  // Theme toggling is driven by CSS variables + html.light class.
  // darkMode: 'class' is kept so we can also toggle via class, but the
  // real color switching happens through CSS variables in globals.css.
  darkMode: 'class',
  content: [
    './src/app/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
    './src/lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Semantic tokens backed by CSS variables — these swap with theme.
        bg: {
          DEFAULT: 'rgb(var(--bg) / <alpha-value>)',
          50: 'rgb(var(--bg-50) / <alpha-value>)',
          100: 'rgb(var(--bg-100) / <alpha-value>)',
          200: 'rgb(var(--bg-200) / <alpha-value>)',
          300: 'rgb(var(--bg-300) / <alpha-value>)',
        },
        ink: 'rgb(var(--ink) / <alpha-value>)',
        muted: 'rgb(var(--muted) / <alpha-value>)',
        surface: 'rgb(var(--surface) / <alpha-value>)',
        line: 'rgb(var(--line) / <alpha-value>)',
        // Accent palette — also theme-aware via CSS vars
        accent: {
          purple: 'rgb(var(--purple) / <alpha-value>)',
          blue: 'rgb(var(--blue) / <alpha-value>)',
          cyan: 'rgb(var(--cyan) / <alpha-value>)',
        },
      },
      fontFamily: {
        sans: ["'Bricolage Grotesque'", "'DM Sans'", 'system-ui', 'sans-serif'],
        display: ["'Bricolage Grotesque'", "'DM Sans'", 'system-ui', 'sans-serif'],
        mono: ["'JetBrains Mono'", 'ui-monospace', 'monospace'],
      },
      backgroundImage: {
        'radial-fade':
          'radial-gradient(ellipse at center, var(--tw-gradient-stops))',
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'slide-up': 'slideUp 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'float': 'float 6s ease-in-out infinite',
        'aurora-rotate': 'auroraRotate 20s linear infinite',
        'shimmer': 'shimmer 3s ease-in-out infinite',
        'gradient-shift': 'gradientShift 8s ease infinite',
        'blink': 'blink 1s step-end infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-16px)' },
        },
        auroraRotate: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        shimmer: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
      },
      boxShadow: {
        glow: '0 0 60px -15px rgba(139, 92, 246, 0.45)',
        'glow-cyan': '0 0 60px -15px rgba(6, 182, 212, 0.4)',
        'glow-blue': '0 0 60px -15px rgba(59, 130, 246, 0.4)',
        glass: '0 8px 32px rgba(0, 0, 0, 0.37)',
        'inner-glow': 'inset 0 1px 0 0 rgba(255, 255, 255, 0.05)',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};

export default config;