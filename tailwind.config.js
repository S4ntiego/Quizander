const { fontFamily } = require("tailwindcss/defaultTheme")

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  future: {
    hoverOnlyWhenSupported: true,
  },
  content: [
    "./app/**/*.{js,ts,jsx,tsx}", // Note the addition of the `app` directory.
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      xs: "575px",
      sm: "768px",
      md: "1024px",
      lg: "1180px",
      xl: "1340px",
      "2xl": "1408px",
    },
    container: {
      center: true,
      padding: "1.9rem",
      screens: {
        xs: "575px",
        sm: "768px",
        md: "1024px",
        lg: "1180px",
        xl: "1340px",
        "2xl": "1408px",
      },
    },
    extend: {
      colors: {
        dark: {
          50: "#FFFFFF",
          100: "#FCFCFC",
          150: "#A7A7A7",
          200: "#727272",
          300: "#5E5E5E",
          400: "#4B4B4B",
          500: "#282828",
          600: "#181818",
          700: "#121212",
          800: "#070707",
          900: "#000000",
        },
      },
      gridRow: {
        "span-7": "span 7 / span 7",
        "span-8": "span 8 / span 8",
        "span-9": "span 9 / span 9",
        "span-10": "span 10 / span 10",
      },
      gridTemplateRows: {
        8: "repeat(8, minmax(0, 1fr))",
        9: "repeat(9, minmax(0, 1fr))",
        10: "repeat(10, minmax(0, 1fr))",
        11: "repeat(11, minmax(0, 1fr))",
        12: "repeat(12, minmax(0, 1fr))",
        16: "repeat(16, minmax(0, 1fr))",
      },
      fontFamily: {
        playfair: ["var(--font-playfair-display)"],
        lexend: ["var(--font-lexend)"],
        fraunces: ["var(--font-fraunces)"],
        outfit: ["var(--font-outfit)"],
        mulish: ["var(--font-mulish)"],
        jost: ["var(--font-jost)"],
        inter: ["var(--font-inter)"],
        dancingscript: ["var(--font-dancing-script)"],
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/line-clamp")],
}
