import React from "react";
import { type PbRenderElementPlugin } from "@webiny/app-page-builder/types.js";
import FormElementComponent from "./FormElementComponent.js";

const plugin: PbRenderElementPlugin = {
    name: "pb-render-page-element-form",
    type: "pb-render-page-element",
    elementType: "form",
    render(props) {
        return <FormElementComponent {...props} />;
    },
    renderer(props: any) {
        return <FormElementComponent {...props} />;
    }
};
export default plugin;
