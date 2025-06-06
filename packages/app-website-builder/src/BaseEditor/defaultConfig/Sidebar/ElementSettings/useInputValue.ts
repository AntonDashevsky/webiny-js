import { useDocumentEditor } from "~/DocumentEditor";
import { useSelectFromDocument } from "~/BaseEditor/hooks/useSelectFromDocument";
import type {
    ComponentInput,
    DocumentElement,
    ExpressionBinding,
    StaticBinding
} from "~/sdk/types";
import { useCallback } from "react";

const isExpressionBinding = (
    binding: StaticBinding | ExpressionBinding | undefined
): binding is ExpressionBinding => {
    return binding?.type === "expression";
};

export const useInputValue = (element: DocumentElement, input: ComponentInput) => {
    const editor = useDocumentEditor();

    const value = useSelectFromDocument<StaticBinding | ExpressionBinding>(
        document => {
            const bindings = document.bindings[element.id];

            if (!bindings) {
                // TODO: For now, we only handle root level inputs (nested inputs are not supported).
                return {
                    type: "static",
                    value: ""
                };
            }

            const inputBindings = bindings[`component.inputs.${input.name}`] ?? [];
            const expressionBinding = inputBindings.find(b => b.type === "expression");
            if (expressionBinding) {
                return expressionBinding;
            }

            const staticBinding = inputBindings.find(b => b.type === "static");

            return (
                staticBinding ?? {
                    type: "static",
                    value: ""
                }
            );
        },
        [element.id, input.name]
    );

    const onChange = useCallback(
        (value: any) => {
            editor.updateDocument(state => {
                const bindings = state.bindings[element.id] ?? {};
                let inputBindings = bindings[`component.inputs.${input.name}`] ?? [];
                const expressionBinding = inputBindings.find(b => b.type === "expression");

                if (isExpressionBinding(expressionBinding)) {
                    inputBindings = inputBindings.filter(b => b.type !== "expression");
                    inputBindings.push({ ...expressionBinding, value });
                } else {
                    inputBindings = inputBindings.filter(b => b.type !== "static");
                    inputBindings.push({ type: "static", value });
                }

                bindings[`component.inputs.${input.name}`] = inputBindings;

                state.bindings[element.id] = bindings;
            });
        },
        [element.id, editor]
    );

    const setBindingType = useCallback(
        (type: "static" | "expression") => {
            editor.updateDocument(state => {
                const bindings = state.bindings[element.id] ?? {};
                let inputBindings = bindings[`component.inputs.${input.name}`] ?? [];

                if (type === "static") {
                    // Switching to static bindings means we have to remove the expression binding.
                    inputBindings = inputBindings.filter(b => b.type !== "expression");
                } else {
                    // Remove the current and add a new expression binding.
                    inputBindings = inputBindings.filter(b => b.type !== "expression");
                    inputBindings.push({ type: "expression", value: "" });
                }

                bindings[`component.inputs.${input.name}`] = inputBindings;

                state.bindings[element.id] = bindings;
            });
        },
        [element.id]
    );

    return { value, onChange, setBindingType };
};
