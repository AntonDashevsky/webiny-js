import { I18NLocaleContextPlugin } from "~/types.js";

export default [
    {
        type: "i18n-locale-context",
        context: {
            name: "default"
        }
    },
    {
        type: "i18n-locale-context",
        context: {
            name: "content"
        }
    }
] as I18NLocaleContextPlugin[];
