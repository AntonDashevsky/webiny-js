import React from "react";
import { PbEditorPageElementVariableRendererPlugin } from "~/types.js";
import IconVariableInput from "~/editor/plugins/elementSettings/variable/IconVariableInput.js";
import { useElementVariables } from "~/editor/hooks/useElementVariableValue.js";

export default {
    name: "pb-editor-page-element-variable-renderer-icon",
    type: "pb-editor-page-element-variable-renderer",
    elementType: "icon",
    getVariableValue(element) {
        const variables = useElementVariables(element);
        return variables.length > 0 ? variables[0].value : null;
    },
    renderVariableInput(variableId: string) {
        return <IconVariableInput variableId={variableId} />;
    },
    setElementValue(element, variables) {
        const newIcon = variables?.length > 0 ? variables[0].value : null;

        if (newIcon && element?.data?.icon?.icon) {
            element.data.icon.icon = newIcon;
        }

        return element;
    }
} as PbEditorPageElementVariableRendererPlugin;
