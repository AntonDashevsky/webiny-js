import { type PbRenderElementPlugin } from "~/types.js";
import { createCarousel } from "@webiny/app-page-builder-elements/renderers/carousel.js";

export default (): PbRenderElementPlugin => {
    return {
        type: "pb-render-page-element",
        name: "pb-render-page-element-carousel",
        elementType: "carousel",
        render: createCarousel()
    };
};
