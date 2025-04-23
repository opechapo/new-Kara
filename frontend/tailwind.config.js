/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // Enable dark mode with class strategy
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Scan all source files for Tailwind classes
  ],
  theme: {
    extend: {}, // Add custom theme extensions if needed
  },
  plugins: [require("tailwind-scrollbar-hide")], // Keep your plugin
};