import React from "react";
import { type PbEditorPageElementVariableRendererPlugin } from "~/types.js";
import SingleImageVariableInput from "~/editor/plugins/elementSettings/variable/SingleImageVariableInput.js";
import { useElementVariables } from "~/editor/hooks/useElementVariableValue.js";

export default {
    name: "pb-editor-page-element-variable-renderer-image",
    type: "pb-editor-page-element-variable-renderer",
    elementType: "image",
    getVariableValue(element) {
        const variables = useElementVariables(element);
        return variables.length > 0 ? variables[0].value : null;
    },
    renderVariableInput(variableId: string) {
        return <SingleImageVariableInput variableId={variableId} />;
    },
    setElementValue(element, variables) {
        const newFile = variables?.length > 0 ? variables[0].value : null;

        if (newFile && element?.data?.image) {
            element.data.image.file = newFile;
        }

        return element;
    }
} as PbEditorPageElementVariableRendererPlugin;
