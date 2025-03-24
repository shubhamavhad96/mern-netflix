import tailwindScrollbarHide from 'tailwind-scrollbar-hide';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",  // Include your HTML file(s)
      "./src/**/*.{js,ts,jsx,tsx}"  // Include any JS/TS files if using React/Vue
    ],
    theme: {
      extend: {},
    },
    plugins: [tailwindScrollbarHide],
  };
  
  