/** @type {import('tailwindcss').Config} */
module.exports = {
  plugins: [require("flowbite/plugin"),require('tailwind-scrollbar'),],
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./node_modules/flowbite/**/*.js"],
  theme: {
    extend: {
      zIndex: {
        1: "100",
      }, 
    },
  },
};
