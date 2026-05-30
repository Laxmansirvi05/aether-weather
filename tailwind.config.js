/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand': {
          darkBg: '#090E17',      // Deep navy/black background
          sidebar: '#0D131F',     // Sidebar dark background
          card: 'rgba(21, 31, 50, 0.5)', // Glassmorphic card background
          cardBorder: 'rgba(255, 255, 255, 0.08)',
          accentTeal: '#00E5FF',  // Bright teal for active states and icons
          accentCyan: '#00B0FF',  // Blue accent
          accentLight: 'rgba(0, 229, 255, 0.15)', // Glass teal highlight
          textPrimary: '#FFFFFF',
          textSecondary: '#78909C',
          textMuted: '#546E7A',
        }
      },
      fontFamily: {
        sans: ['Inter', 'Outfit', 'sans-serif'],
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        'glow-teal': '0 0 15px rgba(0, 229, 255, 0.3)',
      }
    },
  },
  plugins: [],
}
