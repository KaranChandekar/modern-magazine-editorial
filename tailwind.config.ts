import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: ["class", '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        magazine: {
          bg: "var(--color-bg)",
          text: "var(--color-text)",
          accent: "var(--color-accent)",
          border: "var(--color-border)",
          "text-muted": "var(--color-text-muted)",
        },
      },
      fontFamily: {
        serif: ["Playfair Display", "Georgia", "serif"],
        sans: ["Source Sans 3", "system-ui", "sans-serif"],
        display: ["Playfair Display", "Georgia", "serif"],
      },
      typography: {
        DEFAULT: {
          css: {
            color: "var(--color-text)",
            a: { color: "var(--color-accent)" },
            h1: { color: "var(--color-text)" },
            h2: { color: "var(--color-text)" },
            h3: { color: "var(--color-text)" },
            blockquote: { color: "var(--color-text-muted)" },
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
