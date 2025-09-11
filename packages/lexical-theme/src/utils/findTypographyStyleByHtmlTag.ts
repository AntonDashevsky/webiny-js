import type { ThemeEmotionMap } from "~/types";

export const findTypographyStyleByHtmlTag = (
    htmlTag: string | string[],
    themeEmotionMap: ThemeEmotionMap
) => {
    const tags = Array.isArray(htmlTag) ? htmlTag : [htmlTag];

    for (const styleId in themeEmotionMap) {
        const style = themeEmotionMap[styleId];
        if (tags.includes(style.tag)) {
            return style;
        }
    }
    return undefined;
};
