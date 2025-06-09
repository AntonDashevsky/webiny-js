import kebabCase from "lodash/kebabCase.js";
import { createIFrame } from "@webiny/app-page-builder-elements/renderers/embeds/iframe.js";
import { type PbRenderElementPluginArgs, type PbRenderElementPlugin } from "~/types.js";

export default (args: PbRenderElementPluginArgs = {}): PbRenderElementPlugin => {
    const elementType = kebabCase(args.elementType || "iframe");

    return {
        name: `pb-render-page-element-${elementType}`,
        type: "pb-render-page-element",
        elementType: elementType,
        render: createIFrame()
    };
};
