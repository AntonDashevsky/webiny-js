import { PbRenderElementPlugin } from "~/types.js";
import { BlockRenderer } from "@webiny/app-page-builder-elements/renderers/block.js";

export default (): PbRenderElementPlugin => {
    return {
        name: "pb-render-page-element-block",
        type: "pb-render-page-element",
        elementType: "block",
        render: BlockRenderer
    };
};
