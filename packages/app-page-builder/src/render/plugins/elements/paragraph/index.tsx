import kebabCase from "lodash/kebabCase.js";
import { ParagraphRenderer } from "@webiny/app-page-builder-elements/renderers/paragraph.js";
import { type PbRenderElementPluginArgs, type PbRenderElementPlugin } from "~/types.js";

export default (args: PbRenderElementPluginArgs = {}): PbRenderElementPlugin => {
    const elementType = kebabCase(args.elementType || "paragraph");

    return {
        name: `pb-render-page-element-${elementType}`,
        type: "pb-render-page-element",
        elementType: elementType,
        render: ParagraphRenderer
    };
};
