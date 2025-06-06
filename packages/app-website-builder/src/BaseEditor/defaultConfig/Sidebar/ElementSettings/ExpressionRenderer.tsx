import React from "react";
import { Select } from "@webiny/admin-ui";

import { useSelectFromDocument } from "~/BaseEditor/hooks/useSelectFromDocument";
import { StatePathsExtractor } from "~/BaseEditor/defaultConfig/Sidebar/ElementSettings/StatePathsExtractor";
import {
    ComponentInput,
    DocumentElement,
    type ExpressionBinding,
    type StaticBinding
} from "~/sdk/types";

interface ExpressionRendererProps {
    element: DocumentElement;
    input: ComponentInput;
    value: string;
    onChange: (value: string) => void;
}

const isExpressionBinding = (
    binding: StaticBinding | ExpressionBinding | undefined
): binding is ExpressionBinding => {
    return binding?.type === "expression";
};

export const ExpressionRenderer = ({
    element,
    input,
    value,
    onChange
}: ExpressionRendererProps) => {
    const options = useSelectFromDocument(document => {
        const repeat = document.bindings[element.id]?.$repeat;

        if (repeat) {
            const expressionBinding = repeat.find(binding => binding.type === "expression");
            const staticBinding = repeat.find(binding => binding.type === "static");

            if (isExpressionBinding(expressionBinding)) {
                return new StatePathsExtractor(document.state)
                    .getChildPaths(expressionBinding.value)
                    .filter(option => option.type.matches(input.dataType))
                    .values();
            }

            return new StatePathsExtractor((staticBinding?.value as any) ?? {})
                .getPaths()
                .filter(option => option.type.matches(input.dataType))
                .values();
        }
        return new StatePathsExtractor(document.state)
            .getPaths()
            .filter(option => option.type.matches(input.dataType))
            .values();
    });

    return (
        <Select
            label={input.label}
            placeholder={"Select binding"}
            options={options}
            value={value}
            onChange={value => onChange(value === "" ? undefined : value)}
        />
    );
};
