/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts}", // ← ajoute cette ligne
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
