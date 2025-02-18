import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";
import typography from "@tailwindcss/typography";

const config: Config = {
    darkMode: ["class"],
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./sanity/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            screens: {
                xs: "475px", // Custom breakpoint for extra-small screens
            },
            colors: {
                primary: {
                    100: "#FFE8F0",
                    DEFAULT: "#EE2B69", // Default primary color
                },
                secondary: "#FBE843", // Secondary color
                black: {
                    100: "#333333",
                    200: "#141413",
                    300: "#7D8087",
                    DEFAULT: "#000000", // Default black color
                },
                white: {
                    100: "#F7F7F7",
                    DEFAULT: "#FFFFFF", // Default white color
                },
            },
            fontFamily: {
                "work-sans": ["var(--font-work-sans)"], // Custom font family
            },
            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
            },
            boxShadow: {
                100: "2px 2px 0px 0px rgb(0, 0, 0)",
                200: "2px 2px 0px 2px rgb(0, 0, 0)",
                300: "2px 2px 0px 2px rgb(238, 43, 105)",
            },
        },
    },
    plugins: [animate, typography], // Use ES Module imports for plugins
};

export default config;