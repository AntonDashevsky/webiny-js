import kebabCase from "lodash/kebabCase.js";
import { PbRenderElementPluginArgs, PbRenderElementPlugin } from "~/types.js";
import { createVimeo } from "@webiny/app-page-builder-elements/renderers/embeds/vimeo.js";

export default (args: PbRenderElementPluginArgs = {}): PbRenderElementPlugin => {
    const elementType = kebabCase(args.elementType || "vimeo");

    return {
        name: `pb-render-page-element-${elementType}`,
        type: "pb-render-page-element",
        elementType: elementType,
        render: createVimeo()
    };
};
