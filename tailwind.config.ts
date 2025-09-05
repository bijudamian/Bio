import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      // Here we tell Tailwind about your custom quantum colors
      colors: {
        'quantum-primary': 'var(--quantum-primary)',
        'quantum-secondary': 'var(--quantum-secondary)',
        'quantum-accent': 'var(--quantum-accent)',
        'quantum-emerald': 'var(--quantum-emerald)',
        'quantum-cyan': 'var(--quantum-cyan)',
        'quantum-warning': 'var(--quantum-warning)',
        'quantum-danger': 'var(--quantum-danger)',
        'quantum-dark': 'var(--quantum-dark)',
        'quantum-darker': 'var(--quantum-darker)',
        'quantum-card': 'var(--quantum-card)',
        'quantum-surface': 'var(--quantum-surface)',
        'quantum-border': 'var(--quantum-border)',
        'quantum-light': 'var(--quantum-light)',
        'quantum-muted': 'var(--quantum-muted)',
        'quantum-subtle': 'var(--quantum-subtle)',
        // Adding shadcn variables for compatibility
        border: "var(--quantum-border)",
        input: "var(--quantum-border)",
        ring: "var(--quantum-primary)",
        background: "var(--quantum-dark)",
        foreground: "var(--quantum-light)",
        primary: {
          DEFAULT: "var(--quantum-primary)",
          foreground: "var(--quantum-light)",
        },
        secondary: {
          DEFAULT: "var(--quantum-secondary)",
          foreground: "var(--quantum-light)",
        },
        destructive: {
          DEFAULT: "var(--quantum-danger)",
          foreground: "var(--quantum-light)",
        },
        muted: {
          DEFAULT: "var(--quantum-muted)",
          foreground: "var(--quantum-dark)",
        },
        accent: {
          DEFAULT: "var(--quantum-accent)",
          foreground: "var(--quantum-dark)",
        },
        popover: {
          DEFAULT: "var(--quantum-card)",
          foreground: "var(--quantum-light)",
        },
        card: {
          DEFAULT: "var(--quantum-card)",
          foreground: "var(--quantum-light)",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["var(--font-space-grotesk)", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "monospace"],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "quantum-float": {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "33%": { transform: "translateY(-10px) rotate(1deg)" },
          "66%": { transform: "translateY(5px) rotate(-1deg)" },
        },
        // ... include other custom animations if needed
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "quantum-float": "quantum-float 6s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
