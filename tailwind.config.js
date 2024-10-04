/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontSize: {
    '2xs': '.55rem',     // Extra Small
    'xs': '.75rem',     // Extra Small
    'sm': '.875rem',    // Small
    'base': '1rem',     // Base
    'lg': '1.125rem',   // Large
    'xl': '1.25rem',    // Extra Large
    '2xl': '1.5rem', 
    '2.5xl': '1.65rem',   // 2 Extra Large
    '3xl': '1.875rem',  // 3 Extra Large
    '4xl': '2.25rem',   // 4 Extra Large
    '5xl': '3rem',      // 5 Extra Large
    '6xl': '5rem',      // 5 Extra Large
    '8xl': '8rem',      // 6 Extra Large
  },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.scrollbar-hide::-webkit-scrollbar': {
          display: 'none',
        },
        '.scrollbar-show::-webkit-scrollbar': {
          display: 'auto',
        },
        '.scrollbar-show': {
          overflow: 'auto',
        },
      });
    },
  ],
}

