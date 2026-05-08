import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // DueVisa Brand Colors
        forest:    "#0A5C4A",
        lime:      "#C8F562",
        gold:      "#E8C547",
        midnight:  "#050E0B",
        card:      "#0F2419",
        sage:      "#7A9E8A",
        critical:  "#DC2626",
        // Extended palette
        "forest-dark":  "#073D31",
        "forest-deep":  "#052A22",
        "forest-light": "#0E7A62",
        "lime-dark":    "#A8D44A",
        "card-light":   "#162D20",
        "sage-dark":    "#5A7E6A",
        // Typeform warm off-whites
        "warm-white":   "#FAF9F7",
        "tinted-white": "#F0F4EF",
        "off-white":    "#F5F5F3",
        // Mapped CSS Variables for theming
        "page-bg":       "var(--bg-page)",
        "page-alt":      "var(--bg-page-alt)",
        "page-alt2":     "var(--bg-page-alt2)",
        "card-bg":       "var(--bg-card)",
        "card-elevated": "var(--bg-card-elevated)",
        "nav-bg":        "var(--bg-nav)",
        "border-default":"var(--border-default)",
        "border-strong": "var(--border-strong)",
        "border-subtle": "var(--border-subtle)",
        "primary":       "var(--text-primary)",
        "secondary":     "var(--text-secondary)",
        "muted":         "var(--text-muted)",
        "on-forest":     "var(--text-on-forest)",
      },
      fontFamily: {
        // Primary: Plus Jakarta Sans (Typeform-style)
        sans:      ["Plus Jakarta Sans", "system-ui", "-apple-system", "sans-serif"],
        jakarta:   ["Plus Jakarta Sans", "sans-serif"],
        // Legacy (still used in dashboard)
        syne:      ["Plus Jakarta Sans", "sans-serif"], // maps to new font
        cormorant: ["Plus Jakarta Sans", "sans-serif"],
        mono:      ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
      backgroundImage: {
        "gradient-radial":    "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":     "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "gradient-hero-light":"linear-gradient(160deg, #FFFFFF 0%, #F0F4EF 100%)",
        "gradient-hero-dark": "linear-gradient(135deg, #050E0B 0%, #0A5C4A20 50%, #050E0B 100%)",
        "gradient-forest":    "linear-gradient(135deg, #0A5C4A 0%, #073D31 100%)",
      },
      animation: {
        "pulse-slow":    "pulse 3s ease-in-out infinite",
        "spin-slow":     "spin 8s linear infinite",
        "float":         "float 5s ease-in-out infinite",
        "fade-up":       "fade-up 0.5s ease-out forwards",
        "fade-in":       "fade-in 0.4s ease-out forwards",
        "slide-up":      "fade-up 0.5s ease-out forwards",
        "glow":          "glow 2.5s ease-in-out infinite",
        "ping-pulse":    "ping-pulse 1.5s cubic-bezier(0,0,0.2,1) infinite",
      },
      keyframes: {
        "float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%":      { transform: "translateY(-8px)" },
        },
        "fade-up": {
          "0%":   { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%":   { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "glow": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(10,92,74,0.20)" },
          "50%":      { boxShadow: "0 0 40px rgba(10,92,74,0.40)" },
        },
        "ping-pulse": {
          "0%, 100%": { transform: "scale(1)", opacity: "0.75" },
          "50%":      { transform: "scale(2.2)", opacity: "0" },
        },
      },
      boxShadow: {
        "card":       "0 4px 16px rgba(10,26,15,0.06), 0 1px 4px rgba(10,26,15,0.04)",
        "card-hover": "0 12px 40px rgba(10,26,15,0.10), 0 4px 12px rgba(10,26,15,0.06)",
        "nav":        "0 1px 0 #E8EBE6",
        "nav-scroll": "0 4px 20px rgba(10,26,15,0.08)",
        "btn":        "0 2px 8px rgba(10,92,74,0.20)",
        "btn-hover":  "0 6px 20px rgba(10,92,74,0.30)",
        "glow-lime":  "0 0 30px rgba(200,245,98,0.25)",
        "glow-forest":"0 0 30px rgba(10,92,74,0.30)",
      },
      letterSpacing: {
        tighter: "-0.04em",
        tight:   "-0.025em",
      },
    },
  },
  plugins: [],
};

export default config;
