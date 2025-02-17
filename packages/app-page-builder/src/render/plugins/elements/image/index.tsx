import kebabCase from "lodash/kebabCase.js";
import { PbRenderElementPluginArgs, PbRenderElementPlugin } from "~/types.js";
import { ImageRenderer } from "@webiny/app-page-builder-elements/renderers/image.js";

export default (args: PbRenderElementPluginArgs = {}): PbRenderElementPlugin => {
    const elementType = kebabCase(args.elementType || "image");

    return {
        name: `pb-render-page-element-${elementType}`,
        type: "pb-render-page-element",
        elementType: elementType,
        render: ImageRenderer
    };
};
