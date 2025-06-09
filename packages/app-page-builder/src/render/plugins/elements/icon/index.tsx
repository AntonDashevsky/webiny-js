import kebabCase from "lodash/kebabCase.js";
import { type PbRenderElementPluginArgs, type PbRenderElementPlugin } from "~/types.js";
import { IconRenderer } from "@webiny/app-page-builder-elements/renderers/icon.js";

export default (args: PbRenderElementPluginArgs = {}): PbRenderElementPlugin => {
    const elementType = args.elementType || "icon";

    return {
        name: `pb-render-page-element-${kebabCase(elementType)}`,
        type: "pb-render-page-element",
        elementType: "icon",
        render: IconRenderer
    };
};
