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
      xxs: { raw: "(max-height: 670px)" },
      xs: "480px",
      sm: "576px",
      md: "768px",
      lg: "992px",
      xl: "1100px",
      "2xl": "1200px",
      tall: {
        raw: `only screen and (max-height: 960px) and (max-width: 480px)`,
      },
      wide: {
        raw: `only screen and (max-height: 480px) and (max-width: 960px)`,
      },
    },
    container: {
      center: true,
      padding: "1.9rem",
      screens: {
        xxs: { raw: "(max-height: 670px)" },
        xs: "480px",
        sm: "576px",
        md: "768px",
        lg: "992px",
        xl: "1100px",
        "2xl": "1200px",
        tall: {
          raw: `only screen and (max-height: 960px) and (max-width: 480px)`,
        },
        wide: {
          raw: `only screen and (max-height: 480px) and (max-width: 960px)`,
        },
      },
    },
    extend: {
      colors: {
        dark: {
          50: "#FFFFFF",
          100: "#FCFCFC",
          150: "#FFFFFFE6",
          200: "#A7A7A7",
          250: "#727272",
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
        lexend: ["var(--font-lexend)"],
        space: ["var(--font-space-grotesk)"],
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
