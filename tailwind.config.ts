import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx,js,jsx,mdx}"],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "20px",
        sm: "32px",
        lg: "64px",
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1280px",
      },
    },
    extend: {
      colors: {
        // === Z-Data NITEFLYTE palette ===
        deepNight: "#0A1547",
        niteflyte: "#1B3A7A",
        twilight: {
          DEFAULT: "#4A7BC7",
          50: "#EEF3FB",
          100: "#D7E2F3",
          500: "#4A7BC7",
        },
        windowBlue: "#8FB8E8",
        windowLight: "#FFD89E",
        sunsetPink: "#FF8AB4",
        // === Neutrals ===
        paper: "#FAFAF7",
        charcoal: "#1A1A1A",
        onyx: "#0A0A0A",
        ink: {
          50: "#FAFAF7",
          100: "#F5F5F0",
          300: "#D4D4D4",
          500: "#737373",
          700: "#404040",
          900: "#1A1A1A",
        },
      },
      fontFamily: {
        sans: [
          "var(--font-dm-sans)",
          "var(--font-noto-jp)",
          "-apple-system",
          "BlinkMacSystemFont",
          '"Hiragino Sans"',
          '"Hiragino Kaku Gothic ProN"',
          '"Yu Gothic UI"',
          '"Yu Gothic"',
          "YuGothic",
          "Meiryo",
          '"Noto Sans CJK JP"',
          '"Noto Sans JP"',
          "system-ui",
          "sans-serif",
        ],
        jp: [
          "var(--font-noto-jp)",
          '"Hiragino Sans"',
          '"Hiragino Kaku Gothic ProN"',
          '"Yu Gothic UI"',
          '"Yu Gothic"',
          "YuGothic",
          "Meiryo",
          '"Noto Sans CJK JP"',
          '"Noto Sans JP"',
          "system-ui",
          "sans-serif",
        ],
        syne: ["var(--font-syne)", "serif"],
        mono: ["var(--font-space-grotesk)", '"JetBrains Mono"', "monospace"],
      },
      fontSize: {
        eyebrow: [
          "11px",
          { lineHeight: "1.4", letterSpacing: "0.18em", fontWeight: "700" },
        ],
        caption: [
          "12px",
          { lineHeight: "1.5", letterSpacing: "0.04em", fontWeight: "500" },
        ],
        bodysm: ["14px", { lineHeight: "1.6", fontWeight: "400" }],
        body: ["16px", { lineHeight: "1.7", fontWeight: "400" }],
        bodylg: ["18px", { lineHeight: "1.65", fontWeight: "400" }],
        h3: [
          "22px",
          { lineHeight: "1.35", letterSpacing: "-0.01em", fontWeight: "600" },
        ],
        h2: [
          "32px",
          { lineHeight: "1.25", letterSpacing: "-0.015em", fontWeight: "700" },
        ],
        h1: [
          "48px",
          { lineHeight: "1.15", letterSpacing: "-0.02em", fontWeight: "700" },
        ],
        display: [
          "72px",
          { lineHeight: "1.05", letterSpacing: "-0.02em", fontWeight: "700" },
        ],
      },
      maxWidth: {
        container: "1280px",
        narrow: "720px",
        wide: "1440px",
      },
      backgroundImage: {
        niteflyte:
          "linear-gradient(180deg, #4A6FA8 0%, #2A4A82 25%, #15296A 55%, #0A1547 100%)",
        "niteflyte-breathe":
          "linear-gradient(180deg, #4A6FA8 0%, #2A4A82 25%, #15296A 55%, #0A1547 100%)",
        "hero-radial":
          "radial-gradient(ellipse at center, rgba(255,216,158,0.10) 0%, rgba(255,216,158,0) 60%)",
        "sunset-radial":
          "radial-gradient(ellipse at 30% 70%, rgba(255,138,180,0.18) 0%, rgba(255,138,180,0) 50%)",
      },
      boxShadow: {
        sm: "0 1px 2px rgba(0, 0, 0, 0.04)",
        md: "0 4px 12px rgba(0, 0, 0, 0.06)",
        lg: "0 8px 24px rgba(0, 0, 0, 0.08)",
        xl: "0 16px 48px rgba(0, 0, 0, 0.12)",
        glow: "0 0 32px rgba(143, 184, 232, 0.2)",
        "glow-pink": "0 0 40px rgba(255, 138, 180, 0.25)",
        card: "0 12px 32px -8px rgba(74, 123, 199, 0.18)",
        "card-hover": "0 16px 40px -8px rgba(74, 123, 199, 0.32)",
      },
      borderRadius: {
        sm: "4px",
        md: "8px",
        lg: "16px",
        xl: "24px",
      },
      transitionTimingFunction: {
        soft: "cubic-bezier(0.4, 0, 0.2, 1)",
        out: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "gradient-breathe": {
          "0%, 100%": { backgroundPosition: "0% 0%" },
          "50%": { backgroundPosition: "0% 100%" },
        },
        "bar-pulse": {
          "0%, 100%": { transform: "scaleY(1)" },
          "50%": { transform: "scaleY(0.55)" },
        },
        twinkle: {
          "0%, 100%": { opacity: "0.35" },
          "50%": { opacity: "1" },
        },
        ripple: {
          "0%": { transform: "scale(0.5)", opacity: "0.7" },
          "100%": { transform: "scale(1.6)", opacity: "0" },
        },
      },
      animation: {
        "fade-up": "fade-up 600ms cubic-bezier(0.16, 1, 0.3, 1) both",
        "fade-in": "fade-in 600ms cubic-bezier(0.16, 1, 0.3, 1) both",
        "gradient-breathe": "gradient-breathe 30s ease-in-out infinite",
        "bar-pulse": "bar-pulse 4.5s ease-in-out infinite",
        twinkle: "twinkle 4s ease-in-out infinite",
        ripple: "ripple 0.7s ease-out",
      },
    },
  },
  plugins: [],
};

export default config;
