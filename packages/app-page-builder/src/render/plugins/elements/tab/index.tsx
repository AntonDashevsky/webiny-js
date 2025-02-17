import { PbRenderElementPlugin } from "~/types.js";
import { createTab } from "@webiny/app-page-builder-elements/renderers/tab.js";

export default (): PbRenderElementPlugin => {
    return {
        type: "pb-render-page-element",
        name: "pb-render-page-element-tab",
        elementType: "tab",
        render: createTab()
    };
};
