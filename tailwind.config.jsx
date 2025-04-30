/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'destiny-purple': '#6B46C1',
        'destiny-indigo': '#4C51BF',
      },
    },
  },
  plugins: [],
};
