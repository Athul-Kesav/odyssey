import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily:{
        brigends: ['Brigends Expanded', 'sans-serif'],
        laBelle: ['La Belle Aurore', 'cursive'],
        montserrat: ['Montserrat', 'sans-serif'],
        neueMachina: ['Neue Machina', 'sans-serif'],
        spaceMono: ['Space Mono', 'monospace'],
        nightMareCHack: ['Nightmare Codehack', 'monospace'],
      }
    },
  },
  plugins: [],
} satisfies Config;
