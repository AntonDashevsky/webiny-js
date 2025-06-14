import { useDocumentEditor } from "~/DocumentEditor";
import { useSelectFromDocument } from "~/BaseEditor/hooks/useSelectFromDocument";
import type { ComponentInput, DocumentElement, ValueBinding } from "~/sdk/types";
import { useCallback, useState } from "react";
import { Commands } from "~/BaseEditor";
import set from "lodash/set";

export const useInputValue = (element: DocumentElement, input: ComponentInput) => {
    const editor = useDocumentEditor();
    const [localState, setLocalValue] = useState<ValueBinding>();

    const value = useSelectFromDocument<ValueBinding>(
        document => {
            const bindings = document.bindings[element.id];

            if (!bindings) {
                return {
                    static: ""
                };
            }

            return (
                bindings.inputs?.[input.name] ?? {
                    static: ""
                }
            );
        },
        [element.id, input.name]
    );

    const onChange = useCallback(
        (value: any) => {
            editor.updateDocument(state => {
                const bindings = state.bindings[element.id] ?? {};
                const valueBinding = bindings.inputs?.[input.name] ?? {};

                if (valueBinding.expression) {
                    valueBinding.expression = value === undefined ? "$noop" : value;
                } else {
                    valueBinding.static = value;
                }

                set(state.bindings, `${element.id}.inputs.${input.name}`, valueBinding);
            });

            // Clear local value
            setLocalValue(undefined);
        },
        [element.id]
    );

    const onPreviewChange = useCallback(
        (value: any) => {
            setLocalValue({ static: value });
            editor.executeCommand(Commands.PreviewPatchElement, {
                elementId: element.id,
                values: {
                    inputs: {
                        [input.name]: value
                    }
                }
            });
        },
        [element.id]
    );

    const setBindingType = useCallback(
        (type: "static" | "expression") => {
            editor.updateDocument(state => {
                const bindings = state.bindings[element.id] ?? {};
                const valueBinding = bindings.inputs?.[input.name] ?? { static: "" };

                if (type === "static") {
                    // Switching to static bindings means we have to remove the expression binding.
                    delete valueBinding.expression;
                } else {
                    valueBinding.expression = "$noop";
                }

                set(bindings, `inputs.${input.name}`, valueBinding);

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
