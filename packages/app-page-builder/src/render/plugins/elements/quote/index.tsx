import kebabCase from "lodash/kebabCase.js";
import { type PbRenderElementPluginArgs, type PbRenderElementPlugin } from "~/types.js";
import { createQuote } from "@webiny/app-page-builder-elements/renderers/quote.js";

export default (args: PbRenderElementPluginArgs = {}): PbRenderElementPlugin => {
    const elementType = kebabCase(args.elementType || "quote");

    return {
        name: `pb-render-page-element-${elementType}`,
        type: "pb-render-page-element",
        elementType: elementType,
        render: createQuote()
    };
};
