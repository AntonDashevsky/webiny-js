import React from "react";
import Document from "./Document.js";
import { type PbEditorPageElementPlugin } from "~/types.js";

export default (): PbEditorPageElementPlugin => {
    return {
        name: "pb-editor-page-element-document",
        type: "pb-editor-page-element",
        elementType: "document",
        create(options = {}) {
            return {
                type: "document",
                elements: [],
                ...options
            };
        },
        render(props) {
            return <Document {...props} />;
        }
    };
};
