import kebabCase from "lodash/kebabCase.js";
import { PbRenderElementPluginArgs, PbRenderElementPlugin } from "../../../../../types.js";
import { createPinterest } from "@webiny/app-page-builder-elements/renderers/embeds/pinterest.js";

export default (args: PbRenderElementPluginArgs = {}): PbRenderElementPlugin => {
    const elementType = kebabCase(args.elementType || "pinterest");

    return {
        name: `pb-render-page-element-${elementType}`,
        type: "pb-render-page-element",
        elementType: elementType,
        render: createPinterest()
    };
};
