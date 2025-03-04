import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        mainWhite: {
          0: "#ffffff",
          50: "#fff7ed",
          100: "#ffeed5",
        },
        mainOrange: {
          600: "#ea5d0c",
          700: "#cf4a0d",
          800: "#9a3712",
        },

        mainGold: {
          400: "#f3c71c",
          500: "#dba80e",
        },
        mainGray: {
          300: "#e7e7e7",
          400: "#888888",
          500: "#6d6d6d",
          600: "#5d5d5d",
          700: "#292929",
          800: "#454545",
        },
        imageOverlay: {
          75: "rgba(90, 90, 90, 0.75)",
          60: "rgba(90, 90, 90, 0.6)",
        },
      },
      fontSize: {
        14: "0.875rem",
        16: "1rem",
        18: "1.125rem",
        20: "1.25rem",
        24: "1.5rem",
        36: "2.25rem",
        44: "2.75rem",
      },
      screens: {
        medium: { max: "1250px" },
        mobile: { max: "850px" },
        "mobile-small": { max: "400px" },
      },

      borderRadius: {
        base: "4px",
      },

      lineHeight: {
        21: "1.35rem",
        23: "1.4875rem",
        28: "1.8rem",
        30: "1.9125rem",
        34: "2.125rem",
        40: "2.55rem",
        42: "2.625rem",
        52: "3.3rem",
      },
    },
  },
  plugins: [
    function ({
      addVariant,
    }: {
      addVariant: (name: string, value: string) => void;
    }) {
      addVariant("highlight-links", "body:has(#highlight-links:checked) &");
      addVariant("highlight-headers", "body:has(#highlight-headers:checked) &");
      addVariant("stop-animations", "body:has(#stop-animations:checked) &");
      addVariant("grayscale", "body:has(#grayscale:checked) &");
      addVariant("invertContrast", "body:has(#invertContrast:checked) &");
    },
    function ({
      addUtilities,
    }: {
      addUtilities: (
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        utilities: Record<string, any>,
        options?: {
          variants?: string[];
          respectPrefix?: boolean;
          respectImportant?: boolean;
        }
      ) => void;
    }) {
      addUtilities({
        ".scrollbar-hidden": {
          "scrollbar-width": "none",
          "-ms-overflow-style": "none",
        },
        ".scrollbar-hidden::-webkit-scrollbar": {
          display: "none",
        },
      });
    },
  ],
} satisfies Config;
