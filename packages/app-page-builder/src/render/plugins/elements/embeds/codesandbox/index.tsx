import { type PbRenderElementPlugin } from "~/types.js";
import { createCodesandbox } from "@webiny/app-page-builder-elements/renderers/embeds/codesandbox.js";

export default (): PbRenderElementPlugin => {
    return {
        name: "pb-render-page-element-codesandbox",
        type: "pb-render-page-element",
        elementType: "codesandbox",
        render: createCodesandbox()
    };
};
