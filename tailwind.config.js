import daisyui from './node_modules/daisyui';
/** @type {import('tailwindcss').Config} */
export default {
  content: ["index.html", "src/**/*.{js,jsx,css}"],
  theme: {
    fontFamily: {
      sacramento: ["Sacramento", "Arial"],
    },
    extend: {},
  },
  plugins: [daisyui],
  daisyui: {
    themes : ["light"]
  }
};
