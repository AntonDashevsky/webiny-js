import React from "react";
import TextVariableInput from "@webiny/app-page-builder/editor/plugins/elementSettings/variable/TextVariableInput.js";
import { LexicalVariableInputPlugin } from "~/plugins/elementSettings/variables/LexicalVariableInputPlugin.js";
import { isValidLexicalData } from "@webiny/lexical-editor";
import { useVariable } from "@webiny/app-page-builder/hooks/useVariable.js";

export const TextVariableInputPlugin = TextVariableInput.createDecorator(Original => {
    return function TextVariableInputPlugin({ variableId }): JSX.Element {
        const { value } = useVariable(variableId);
        if (!isValidLexicalData(value)) {
            return <Original variableId={variableId} />;
        }
        return <LexicalVariableInputPlugin type={"heading"} variableId={variableId} />;
    };
});
