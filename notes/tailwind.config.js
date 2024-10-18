/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        card: "0 1px 1px rgba(0,0,0,0.075), 0 2px 2px rgba(0,0,0,0.075), 0 4px 4px rgba(0,0,0,0.075), 0 8px 8px rgba(0,0,0,0.075), 0 16px 16px rgba(0,0,0,0.075)",
      },
    },
  },
  plugins: [],
};
