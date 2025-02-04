const { fontFamily } = require("tailwindcss/defaultTheme");
const { getProject } = require("@webiny/cli/utils");
const project = getProject();
const webinyPackagesGlob = `${project.root}/node_modules/@webiny/app*/**/*.js`;
const webinyAdminUiPackageGlob = `${project.root}/node_modules/@webiny/admin-ui/**/*.js`;
const adminAppSourceGlob = `${project.root}/apps/admin`;
const {
    animation,
    backgroundColor,
    borderColor,
    borderRadius,
    borderWidth,
    fill,
    fontSize,
    keyframes,
    margin,
    padding,
    ringColor,
    ringWidth,
    shadow,
    spacing,
    textColor
} = require("./tailwind.config.theme");

/** @type {import('tailwindcss').Config} */
module.exports = {
    prefix: "wby-",
    darkMode: ["class"],
    content: [webinyPackagesGlob, webinyAdminUiPackageGlob, adminAppSourceGlob],
    theme: {
        container: {
            center: true,
            padding: "2rem",
            screens: {
                "2xl": "1400px"
            }
        },

        backgroundColor,
        borderColor,
        borderRadius,
        borderWidth,
        fill,
        fontSize,
        ringColor,
        ringWidth,
        shadow,
        textColor,

        fontFamily: {
            sans: ["var(--font-sans)", ...fontFamily.sans],
            serif: ["var(--font-serif)", ...fontFamily.serif],
            mono: ["var(--font-mono)", ...fontFamily.mono]
        },

        extend: {
            animation,
            keyframes,
            margin,
            padding,
            spacing,
            keyframes,
            animation
        }
    },

    plugins: [require("tailwindcss-animate")]
};
