import get from "lodash/get.js";
import kebabCase from "lodash/kebabCase.js";
import { type PbRenderElementStylePlugin } from "../../../../types.js";
import { applyPerDeviceStyleWithFallback } from "../../../utils.js";

const validateSpacingValue = (value: string): string | "auto" => {
    if (value?.includes("auto")) {
        return "auto";
    }

    const parsedValue = parseInt(value);
    if (Number.isNaN(parsedValue)) {
        return "0px";
    }

    return value;
};

export default {
    name: "pb-render-page-element-style-margin",
    type: "pb-render-page-element-style",
    renderStyle({ element, style }) {
        const { margin } = get(element, "data.settings", {});

        ["top", "right", "bottom", "left"].forEach(side => {
            // Set per-device property value
            applyPerDeviceStyleWithFallback(({ displayMode, fallbackMode }) => {
                const fallbackMarginValue = get(
                    style,
                    `--${kebabCase(fallbackMode)}-margin-${side}`
                );
                const adv = get(margin, `${displayMode}.advanced`, false);
                const value = adv
                    ? get(margin, `${displayMode}.${side}`, fallbackMarginValue)
                    : get(margin, `${displayMode}.all`, fallbackMarginValue);
                style[`--${kebabCase(displayMode)}-margin-${side}`] = validateSpacingValue(value);
            });
        });

        return style;
    }
} as PbRenderElementStylePlugin;
