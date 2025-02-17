import React from "react";
import { HeadingRenderer } from "@webiny/app-page-builder-elements/renderers/heading.js";
import { useElementVariables } from "~/hooks/useElementVariables.js";
import { PbBlockVariable } from "~/types.js";

const getVariableValues = (variables: PbBlockVariable<string>[]) => {
    return {
        text: variables[0]?.value || undefined
    };
};

export const HeadingRendererWithVariables = HeadingRenderer.createDecorator(Original => {
    return function HeadingRenderer(props) {
        const variables = useElementVariables(props.element);

        if (!variables.length) {
            return <Original {...props} />;
        }

        const variableValues = getVariableValues(variables);

        return (
            <Original
                {...props}
                inputs={{
                    text: props.inputs?.text ?? variableValues.text
                }}
            />
        );
    };
});
