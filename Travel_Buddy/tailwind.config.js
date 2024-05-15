/** @type {import('tailwindcss').Config} */
const flowbite = require("flowbite-react/tailwind");
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    flowbite.content(),
  ],
  theme: {
    extend: {
      colors: {
        'custom-color': '#b3cde0',
        'new-color' : '#6497b1',
        'cust-color' : '#dfe3ee',
      }
    },
  },
  plugins: [require('flowbite/plugin'),  require('tailwind-scrollbar')],
}

