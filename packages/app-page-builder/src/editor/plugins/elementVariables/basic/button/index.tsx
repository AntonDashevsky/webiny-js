import React from "react";
import { type PbBlockVariable, type PbEditorPageElementVariableRendererPlugin } from "~/types.js";
import TextVariableInput from "~/editor/plugins/elementSettings/variable/TextVariableInput.js";
import { useElementVariables } from "~/editor/hooks/useElementVariableValue.js";

export default {
    name: "pb-editor-page-element-variable-renderer-button",
    type: "pb-editor-page-element-variable-renderer",
    elementType: "button",
    getVariableValue(element) {
        const variables = useElementVariables(element);

        if (!variables.length) {
            return null;
        }

        return {
            label:
                variables.find((variable: PbBlockVariable<string>) =>
                    variable.id.endsWith(".label")
                )?.value || null,
            url:
                variables.find((variable: PbBlockVariable<string>) => variable.id.endsWith(".url"))
                    ?.value || null
        };
    },
    renderVariableInput(variableId: string) {
        return <TextVariableInput variableId={variableId} />;
    },
    setElementValue(element, variables) {
        const newLabel = variables?.find((variable: PbBlockVariable<string>) =>
            variable.id.endsWith(".label")
        )?.value;
        const newUrl = variables?.find((variable: PbBlockVariable<string>) =>
            variable.id.endsWith(".url")
        )?.value;

        if (newLabel && element?.data) {
            element.data.buttonText = newLabel;
        }
        if (newUrl && element?.data?.action) {
            element.data.action.href = newUrl;
        }

        return element;
    }
} as PbEditorPageElementVariableRendererPlugin;
