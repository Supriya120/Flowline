import type { Config } from "tailwindcss";

// Design tokens for Flowline.
// Palette: cool graphite ink on soft porcelain, with a single
// deep-teal accent for primary actions/focus, and a muted
// amber + lilac pair reserved strictly for status/priority signals
// so they read as *data*, not decoration.
const config: Config = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        porcelain: "#F6F7F9",
        ink: {
          DEFAULT: "#14181F",
          soft: "#3A404B",
          faint: "#8890A0",
        },
        line: "#E4E7EC",
        teal: {
          50: "#EDF7F6",
          100: "#D3EBE8",
          400: "#2E9C93",
          500: "#0F766E",
          600: "#0B5C56",
        },
        amber: {
          100: "#FCEACB",
          500: "#C9822A",
        },
        lilac: {
          100: "#EAE7FB",
          500: "#6C63B8",
        },
        coral: {
          100: "#FBE4E1",
          500: "#C4523F",
        },
        surface: {
          DEFAULT: "#FFFFFF",
          dark: "#1B1F27",
        },
      },
      fontFamily: {
        display: ["'Sora'", "system-ui", "sans-serif"],
        body: ["'Inter'", "system-ui", "sans-serif"],
      },
      borderRadius: {
        xl: "0.875rem",
        "2xl": "1.25rem",
      },
      boxShadow: {
        panel: "0 1px 2px rgba(20,24,31,0.04), 0 8px 24px -12px rgba(20,24,31,0.10)",
        pop: "0 12px 32px -8px rgba(20,24,31,0.22)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(6px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.96)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-500px 0" },
          "100%": { backgroundPosition: "500px 0" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.35s ease-out both",
        "scale-in": "scale-in 0.18s ease-out both",
        shimmer: "shimmer 1.6s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
