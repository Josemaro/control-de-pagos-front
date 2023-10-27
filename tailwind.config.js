const withMT = require("@material-tailwind/react/utils/withMT");
const { nextui } = require("@nextui-org/react");

module.exports = withMT({
    content: [
        "./src/**/*.{html,js}",
        "./src/**/*.{js,jsx,ts,tsx}",
        "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {},
    },
    darkMode: "class",
    plugins: [
        nextui({
            themes: {
                "cyan-light": {
                    // extend: "light", // <- inherit default values from dark theme
                    colors: {
                        background: "#D6E4FF",
                        foreground: "#ffffff",
                        primary: {
                            50: "#094777",
                            100: "#0E6290",
                            200: "#1788B3",
                            300: "#22B3D6",
                            400: "#2FE2F9",
                            500: "#62F6FB",
                            600: "#81FDF7",
                            700: "#ABFEF3",
                            800: "#ABFEF3",
                            900: "#D5FEF6",
                            DEFAULT: "#62F6FB",
                            foreground: "#D5FEF6",
                        },
                        focus: "#2FE2F9",
                    },
                    layout: {
                        disabledOpacity: "0.3",
                        radius: {
                            small: "4px",
                            medium: "6px",
                            large: "8px",
                        },
                        borderWidth: {
                            small: "1px",
                            medium: "2px",
                            large: "3px",
                        },
                    },
                },
            },
        }),
    ],
});