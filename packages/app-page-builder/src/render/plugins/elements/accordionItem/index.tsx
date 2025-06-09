import { type PbRenderElementPlugin } from "~/types.js";
import { createAccordionItem } from "@webiny/app-page-builder-elements/renderers/accordionItem.js";

export default (): PbRenderElementPlugin => {
    return {
        type: "pb-render-page-element",
        name: "pb-render-page-element-accordion-item",
        elementType: "accordion-item",
        render: createAccordionItem()
    };
};
