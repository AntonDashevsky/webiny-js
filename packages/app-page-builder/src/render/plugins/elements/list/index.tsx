import kebabCase from "lodash/kebabCase.js";
import { type PbRenderElementPluginArgs, type PbRenderElementPlugin } from "~/types.js";
import { createList } from "@webiny/app-page-builder-elements/renderers/list.js";

export default (args: PbRenderElementPluginArgs = {}): PbRenderElementPlugin => {
    const elementType = kebabCase(args.elementType || "list");

    return {
        name: `pb-render-page-element-${elementType}`,
        type: "pb-render-page-element",
        elementType: elementType,
        render: createList()
    };
};
