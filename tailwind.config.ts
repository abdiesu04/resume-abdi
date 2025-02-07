import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          dark: '#0A1120',
          main: '#0D1627',
          light: '#1E2D4A',
        },
        secondary: {
          dark: '#8892B0',
          main: '#A8B2D1',
          light: '#CCD6F6',
        },
        accent: {
          emerald: '#22C55E',
          blue: '#3B82F6',
          purple: '#8B5CF6',
        },
        gray: {
          850: '#1E2D4A',
        },
        background: {
          dark: '#0A192F',
          darker: '#020C1B',
          light: '#112240',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'data-flow': 'data-flow 2s ease-in-out infinite',
        'system-scan': 'system-scan 3s ease-in-out infinite',
      },
      keyframes: {
        'data-flow': {
          '0%, 100%': { transform: 'translateX(0) scale(1)', opacity: '0.5' },
          '50%': { transform: 'translateX(100%) scale(1.5)', opacity: '0' },
        },
        'system-scan': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'grid-pattern': 'linear-gradient(to right, #1E2D4A 1px, transparent 1px), linear-gradient(to bottom, #1E2D4A 1px, transparent 1px)',
      },
    },
  },
  plugins: [],
};

export default config;
