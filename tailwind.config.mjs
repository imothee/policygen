/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        background: "#3b3351",
        foreground: "#fcdb7e",
        "accent-one": "#04a0c1",
        "accent-two": "#e06f7e",
        "background-lighten": "#aba2c5",
        "foreground-darken": "#946e03",
      },
    },
  },
  plugins: [],
};
