/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        'fira-code': ['"Fira Code"', 'monospace'],
      },
      colors: {
        'primary': '#00ff00',
        'dark': '#0a0a0a',
        'light': '#f0f0f0',
      },
    },
  },
  plugins: [],
}