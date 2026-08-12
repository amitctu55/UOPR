import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "var(--brand-50)",
          100: "var(--brand-100)",
          200: "var(--brand-200)",
          300: "var(--brand-300)",
          400: "var(--brand-400)",
          500: "var(--brand-500)",
          600: "var(--brand-600)",
          700: "var(--brand-700)",
          800: "var(--brand-800)",
          900: "var(--brand-900)",
        },
        care: {
          50: "var(--care-50)",
          100: "var(--care-100)",
          500: "var(--care-500)",
          600: "var(--care-600)",
          700: "var(--care-700)",
        },
        alert: { 50: "var(--alert-50)", 500: "var(--alert-500)", 600: "var(--alert-600)" },
        warn: { 50: "var(--warn-50)", 500: "var(--warn-500)", 600: "var(--warn-600)" },
        surface: {
          DEFAULT: "var(--surface)",
          raised: "var(--surface-raised)",
          muted: "var(--surface-muted)",
          inverse: "var(--surface-inverse)",
        },
        ink: {
          DEFAULT: "var(--ink)",
          muted: "var(--ink-muted)",
          soft: "var(--ink-soft)",
          inverse: "var(--ink-inverse)",
        },
        line: { DEFAULT: "var(--line)", strong: "var(--line-strong)" },
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-xl": ["3.5rem", { lineHeight: "1.1", letterSpacing: "-0.03em", fontWeight: "700" }],
        "display-lg": ["2.75rem", { lineHeight: "1.15", letterSpacing: "-0.025em", fontWeight: "700" }],
        "display-md": ["2rem", { lineHeight: "1.2", letterSpacing: "-0.02em", fontWeight: "650" }],
        "heading-lg": ["1.5rem", { lineHeight: "1.3", letterSpacing: "-0.015em", fontWeight: "650" }],
        "heading-md": ["1.25rem", { lineHeight: "1.35", letterSpacing: "-0.01em", fontWeight: "600" }],
        "heading-sm": ["1.125rem", { lineHeight: "1.4", fontWeight: "600" }],
        "body-lg": ["1.125rem", { lineHeight: "1.65" }],
        "body-md": ["1rem", { lineHeight: "1.6" }],
        "body-sm": ["0.875rem", { lineHeight: "1.5" }],
        label: ["0.75rem", { lineHeight: "1.4", letterSpacing: "0.04em", fontWeight: "600" }],
      },
      spacing: { 18: "4.5rem" },
      boxShadow: {
        soft: "0 1px 2px rgba(10, 61, 61, 0.04), 0 8px 24px rgba(10, 61, 61, 0.06)",
        lift: "0 4px 16px rgba(10, 61, 61, 0.1)",
        focus: "0 0 0 3px var(--focus-ring)",
      },
      borderRadius: { xl: "1rem", "2xl": "1.25rem", "3xl": "1.75rem" },
      keyframes: {
        "fade-up": { "0%": { opacity: "0", transform: "translateY(12px)" }, "100%": { opacity: "1", transform: "translateY(0)" } },
        "fade-in": { "0%": { opacity: "0" }, "100%": { opacity: "1" } },
        shimmer: { "0%": { backgroundPosition: "-200% 0" }, "100%": { backgroundPosition: "200% 0" } },
        pulseSoft: { "0%, 100%": { opacity: "1" }, "50%": { opacity: "0.55" } },
        float: { "0%, 100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-6px)" } },
      },
      animation: {
        "fade-up": "fade-up 0.55s ease-out both",
        "fade-in": "fade-in 0.4s ease-out both",
        shimmer: "shimmer 1.6s linear infinite",
        "pulse-soft": "pulseSoft 2s ease-in-out infinite",
        float: "float 5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
