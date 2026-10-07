import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        surface: "var(--surface)",
        subtle: "var(--subtle)",
        muted: "var(--muted)",
        line: "var(--line)",
        "line-strong": "var(--line-strong)",
        ink: "var(--ink)",
        "ink-2": "var(--ink-2)",
        "ink-3": "var(--ink-3)",
        accent: "var(--accent)",
        "accent-hover": "var(--accent-hover)",
        "accent-tint": "var(--accent-tint)",
        "on-accent": "var(--on-accent)",
        success: "var(--success)",
        "success-tint": "var(--success-tint)",
        warn: "var(--warn)",
        "warn-tint": "var(--warn-tint)",
        danger: "var(--danger)",
        "danger-tint": "var(--danger-tint)",
        it: "var(--it)",
        "it-tint": "var(--it-tint)",
        hr: "var(--hr)",
        "hr-tint": "var(--hr-tint)",
        fin: "var(--fin)",
        "fin-tint": "var(--fin-tint)",
        fac: "var(--fac)",
        "fac-tint": "var(--fac-tint)",
      },
      borderColor: {
        DEFAULT: "var(--line)",
      },
      fontFamily: {
        sans: [
          '"Segoe UI Variable Text"',
          '"Segoe UI"',
          "Inter",
          "system-ui",
          "-apple-system",
          "Roboto",
          '"Helvetica Neue"',
          "Arial",
          "sans-serif",
        ],
      },
      boxShadow: {
        panel: "0 4px 16px rgba(0, 0, 0, 0.12)",
      },
      keyframes: {
        "fade-in": {
          from: { opacity: "0", transform: "translateY(3px)" },
          to: { opacity: "1", transform: "none" },
        },
      },
      animation: {
        "fade-in": "fade-in 160ms ease-out",
      },
    },
  },
  plugins: [],
};

export default config;
