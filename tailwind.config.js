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
  },
  plugins: [],
};
