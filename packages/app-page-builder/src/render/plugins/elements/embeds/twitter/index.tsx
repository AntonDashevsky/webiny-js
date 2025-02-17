import kebabCase from "lodash/kebabCase.js";
import { PbRenderElementPluginArgs, PbRenderElementPlugin } from "~/types.js";
import { createTwitter } from "@webiny/app-page-builder-elements/renderers/embeds/twitter.js";

export default (args: PbRenderElementPluginArgs = {}): PbRenderElementPlugin => {
    const elementType = kebabCase(args.elementType || "twitter");

    return {
        name: `pb-render-page-element-${elementType}`,
        type: "pb-render-page-element",
        elementType: elementType,
        render: createTwitter()
    };
};
