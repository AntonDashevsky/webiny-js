import { type PbRenderElementPlugin } from "~/types.js";
import { createAccordion } from "@webiny/app-page-builder-elements/renderers/accordion.js";

export default (): PbRenderElementPlugin => {
    return {
        type: "pb-render-page-element",
        name: "pb-render-page-element-accordion",
        elementType: "accordion",
        render: createAccordion()
    };
};
