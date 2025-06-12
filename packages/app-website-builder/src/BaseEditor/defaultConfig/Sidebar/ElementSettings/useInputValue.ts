import { useDocumentEditor } from "~/DocumentEditor";
import { useSelectFromDocument } from "~/BaseEditor/hooks/useSelectFromDocument";
import type {
    ComponentInput,
    DocumentElement,
    ExpressionBinding,
    StaticBinding
} from "~/sdk/types";
import { useCallback, useState } from "react";
import { toJS } from "mobx";
import { Commands } from "~/BaseEditor";

const isExpressionBinding = (
    binding: StaticBinding | ExpressionBinding | undefined
): binding is ExpressionBinding => {
    return binding?.type === "expression";
};

export const useInputValue = (element: DocumentElement, input: ComponentInput) => {
    const editor = useDocumentEditor();
    const [localState, setLocalValue] = useState<any>();

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
                return toJS(expressionBinding);
            }

            const staticBinding = inputBindings.find(b => b.type === "static");

            return staticBinding
                ? toJS(staticBinding)
                : {
                      type: "static",
                      value: ""
                  };
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
                    const staticBinding = inputBindings.find(b => b.type === "static");
                    if (staticBinding) {
                        staticBinding.value = value;
                    } else {
                        inputBindings.push({ type: "static", value });
                    }
                }

                bindings[`component.inputs.${input.name}`] = inputBindings;

                state.bindings[element.id] = bindings;
            });

            // Clear local value
            setLocalValue(undefined);
        },
        [element.id]
    );

    const onPreviewChange = useCallback(
        (value: any) => {
            setLocalValue({ type: "static", value });
            editor.executeCommand(Commands.PreviewPatchElement, {
                elementId: element.id,
                values: {
                    [`component.inputs.${input.name}`]: value
                }
            });
        },
        [element.id]
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

    return {
        value: localState ?? value,
        onChange,
        onPreviewChange,
        setBindingType
    };
};
