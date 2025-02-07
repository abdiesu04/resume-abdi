export const theme = {
  colors: {
    primary: {
      dark: '#0A192F',  // Deep navy
      main: '#112240',  // Military blue
      light: '#233554', // Lighter navy
    },
    secondary: {
      dark: '#8892B0',  // Muted steel
      main: '#A8B2D1',  // Light steel
      light: '#CCD6F6', // Bright steel
    },
    accent: {
      gold: '#FFD700',  // Military gold
      red: '#FF4C4C',   // Alert red
      green: '#00FF9D', // Terminal green
    },
    background: {
      dark: '#0A192F',
      darker: '#020C1B',
      light: '#112240',
    },
  },
  fonts: {
    mono: 'JetBrains Mono, monospace',
    sans: 'Inter, sans-serif',
  },
  transitions: {
    standard: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    smooth: 'all 0.6s cubic-bezier(0.65, 0, 0.35, 1)',
  },
  shadows: {
    glow: '0 0 20px rgba(255, 215, 0, 0.3)',
    terminal: '0 0 10px rgba(0, 255, 157, 0.3)',
  },
};

export type Theme = typeof theme; 