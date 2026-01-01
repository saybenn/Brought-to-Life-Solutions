/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./lib/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // IDE hinting only; actual runtime uses CSS variables via arbitrary values
        ivory: "var(--bg-ivory)",
        cream: "var(--bg-cream)",
        sand: "var(--bg-sand)",
        ink: {
          900: "var(--ink-900)",
          700: "var(--ink-700)",
        },
        green: {
          forest: "var(--green-forest-700)",
          pine: "var(--green-pine-800)",
          emerald: "var(--green-emerald-500)",
        },
        sage: {
          100: "var(--sage-100)",
          200: "var(--sage-200)",
        },
        border: "var(--border)",
        focus: "var(--focus)",
        muted: "var(--muted)",
      },
      borderRadius: {
        smx: "var(--r-sm)",
        mdx: "var(--r-md)",
        lgx: "var(--r-lg)",
      },
      boxShadow: {
        soft: "var(--shadow-soft)",
        card: "var(--shadow-card)",
      },
    },
    screens: {
      sm: "640px", // Small screens, min-width: 640px
      md: "768px", // Medium screens, min-width: 768px
      lg: "1024px", // Large screens, min-width: 1024px
      xl: "1280px", // Extra large screens, min-width: 1280px
      "2xl": "1536px", // 2X extra large screens, min-width: 1536px
    },
  },
  plugins: [],
};
