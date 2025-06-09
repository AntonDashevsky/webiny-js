import kebabCase from "lodash/kebabCase.js";
import { type PbRenderElementPluginArgs, type PbRenderElementPlugin } from "~/types.js";
import { createSoundcloud } from "@webiny/app-page-builder-elements/renderers/embeds/soundcloud.js";

export default (args: PbRenderElementPluginArgs = {}): PbRenderElementPlugin => {
    const elementType = kebabCase(args.elementType || "soundcloud");

    return {
        name: `pb-render-page-element-${elementType}`,
        type: "pb-render-page-element",
        elementType: elementType,
        render: createSoundcloud()
    };
};
