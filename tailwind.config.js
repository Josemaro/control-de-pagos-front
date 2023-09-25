const withMT = require("@material-tailwind/react/utils/withMT");
const {nextui} = require("@nextui-org/react");

module.exports = withMT({
    content: [
        "./src/**/*.{html,js}",
        "./src/**/*.{js,jsx,ts,tsx}",
        "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {},
    },
    darkMode: "class",
    plugins: [nextui()]
});