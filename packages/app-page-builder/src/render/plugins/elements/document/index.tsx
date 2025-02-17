import { PbRenderElementPlugin } from "~/types.js";
import { createDocument } from "@webiny/app-page-builder-elements/renderers/document.js";

export default (): PbRenderElementPlugin => {
    return {
        name: "pb-render-page-element-document",
        type: "pb-render-page-element",
        elementType: "document",
        render: createDocument()
    };
};
