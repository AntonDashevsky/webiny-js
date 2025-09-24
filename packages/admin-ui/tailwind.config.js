import twFontFamily from "tailwindcss/defaultTheme.js";
import tailwindAnimate from "tailwindcss-animate";
import { getProjectSdk } from "@webiny/project";

console.log("RESOLVED PATH", import.meta.resolve("@webiny/project"));

const projectSdk = await getProjectSdk();
const project = projectSdk.getProject();

const webinyPackagesGlob = `${project.paths.rootFolder}/node_modules/@webiny/app*/**/*.{js,ts,tsx}`;
const webinyAdminUiPackageGlob = `${project.paths.rootFolder}/node_modules/@webiny/admin-ui/**/*.{js,ts,tsx}`;
const webinyUiPackageGlob = `${project.paths.rootFolder}/node_modules/@webiny/ui/**/*.{js,ts,tsx}`;
const adminAppSourceGlob = `${project.paths.workspacesFolder}/apps/admin`;
import theme from "./tailwind.config.theme.js";

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
    textColor,
    zIndex
} = theme;

/** @type {import('tailwindcss').Config} */
export default {
    prefix: "wby-",
    darkMode: ["class"],
    content: [
        webinyPackagesGlob,
        webinyAdminUiPackageGlob,
        webinyUiPackageGlob,
        adminAppSourceGlob
    ],
    theme: {
        container: {
            center: true,
            padding: padding.xxl,
            screens: {
                "2xl": "1200px",
                xl: "1200px"
            }
        },

        backgroundColor,
        borderColor,
        borderWidth,
        fill,
        fontSize,
        ringColor,
        ringWidth,
        shadow,
        textColor,

        fontFamily: {
            sans: ["var(--font-sans)", ...twFontFamily.fontFamily.sans],
            serif: ["var(--font-serif)", ...twFontFamily.fontFamily.serif],
            mono: ["var(--font-mono)", ...twFontFamily.fontFamily.mono]
        },

        extend: {
            animation,
            borderRadius,
            keyframes,
            margin,
            padding,
            spacing,
            zIndex
        }
    },

    plugins: [tailwindAnimate]
};
