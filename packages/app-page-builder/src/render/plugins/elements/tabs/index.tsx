import { PbRenderElementPlugin } from "~/types.js";
import { createTabs } from "@webiny/app-page-builder-elements/renderers/tabs.js";

export default (): PbRenderElementPlugin => {
    return {
        type: "pb-render-page-element",
        name: "pb-render-page-element-tabs",
        elementType: "tabs",
        render: createTabs()
    };
};
