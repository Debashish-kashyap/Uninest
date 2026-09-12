/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#4648d4",
        "secondary-container": "#6df5e1",
        "surface": "#f7f9fb",
        "on-surface": "#191c1e",
        "on-surface-variant": "#464554",
        "outline": "#767586",
      },
    },
  },
  plugins: [],
}
