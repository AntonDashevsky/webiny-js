import get from "lodash/get.js";
import kebabCase from "lodash/kebabCase.js";
import { PbRenderElementStylePlugin } from "../../../../types.js";
import { applyPerDeviceStyleWithFallback } from "../../../utils.js";

export default {
    name: "pb-render-page-element-style-height",
    type: "pb-render-page-element-style",
    renderStyle({ element, style }) {
        const { height } = get(element, "data.settings", {});

        applyPerDeviceStyleWithFallback(({ displayMode, fallbackMode }) => {
            const fallbackValue = get(style, `--${kebabCase(fallbackMode)}-height`, "auto");
            // Set style for display mode
            style[`--${kebabCase(displayMode)}-height`] = get(
                height,
                `${displayMode}.value`,
                fallbackValue
            );
        });

        return style;
    }
} as PbRenderElementStylePlugin;
