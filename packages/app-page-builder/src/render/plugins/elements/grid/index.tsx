import { PbRenderElementPlugin } from "~/types.js";
import { GridRenderer } from "@webiny/app-page-builder-elements/renderers/grid.js";

export default (): PbRenderElementPlugin => {
    return {
        type: "pb-render-page-element",
        name: "pb-render-page-element-grid",
        elementType: "grid",
        render: GridRenderer
    };
};
