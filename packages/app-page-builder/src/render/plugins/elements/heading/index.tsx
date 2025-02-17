import kebabCase from "lodash/kebabCase.js";
import { PbRenderElementPluginArgs, PbRenderElementPlugin } from "~/types.js";
import { HeadingRenderer } from "@webiny/app-page-builder-elements/renderers/heading.js";

export default (args: PbRenderElementPluginArgs = {}): PbRenderElementPlugin => {
    const elementType = args.elementType || "heading";

    return {
        name: `pb-render-page-element-${kebabCase(elementType)}`,
        type: "pb-render-page-element",
        elementType,
        render: HeadingRenderer
    };
};
