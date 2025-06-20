import { useCallback, useState } from "react";
import set from "lodash/set";
import { useDocumentEditor } from "~/DocumentEditor";
import { useSelectFromDocument } from "~/BaseEditor/hooks/useSelectFromDocument";
import type { InputValueBinding, ValueBinding } from "~/sdk/types";
import { Commands } from "~/BaseEditor";
import { useActiveElement } from "~/BaseEditor/hooks/useActiveElement";
import type { InputAstNode } from "~/sdk/ComponentManifestToAstConverter";

export const useInputValue = (node: InputAstNode) => {
    const [element] = useActiveElement();
    const editor = useDocumentEditor();
    const [localState, setLocalValue] = useState<ValueBinding>();

    const value = useSelectFromDocument<ValueBinding>(
        document => {
            if (!element) {
                return { static: "" };
            }
            const bindings = document.bindings[element.id];

            if (!bindings) {
                return {
                    static: ""
                };
            }

            return (
                bindings.inputs?.[node.path] ?? {
                    static: ""
                }
            );
        },
        [element?.id, node.name]
    );

    const onChange = useCallback(
        (value: any) => {
            if (!element) {
                return;
            }

            editor.updateDocument(state => {
                const bindings = state.bindings[element.id] ?? { inputs: {} };
                const valueBinding: InputValueBinding = bindings.inputs?.[node.path] ?? {
                    type: node.type,
                    dataType: node.dataType,
                    static: ""
                };

                if (valueBinding.expression) {
                    valueBinding.expression = value === undefined ? "$noop" : value;
                } else {
                    valueBinding.static = value;
                }

                state.bindings[element.id] = {
                    ...bindings,
                    inputs: {
                        ...bindings.inputs,
                        [node.path]: valueBinding
                    }
                };
            });

            // Clear local value
            setLocalValue(undefined);
        },
        [element?.id]
    );

    const onPreviewChange = useCallback(
        (value: any) => {
            if (!element) {
                return;
            }

            setLocalValue({ static: value });
            editor.executeCommand(Commands.PreviewPatchElement, {
                elementId: element.id,
                values: {
                    inputs: {
                        [node.path]: value
                    }
                }
            });
        },
        [element?.id]
    );

    const setBindingType = useCallback(
        (type: "static" | "expression") => {
            if (!element) {
                return;
            }

            editor.updateDocument(state => {
                const bindings = state.bindings[element.id] ?? { inputs: {} };
                const valueBinding: InputValueBinding = bindings.inputs?.[node.path] ?? {
                    type: node.type,
                    dataType: node.dataType,
                    static: ""
                };

                if (type === "static") {
                    // Switching to static bindings means we have to remove the expression binding.
                    delete valueBinding.expression;
                } else {
                    valueBinding.expression = "$noop";
                }

                state.bindings[element.id] = {
                    ...bindings,
                    inputs: {
                        ...bindings.inputs,
                        [node.path]: valueBinding
                    }
                };
            });
        },
        [element?.id]
    );

    return {
        value: localState ?? value,
        onChange,
        onPreviewChange,
        setBindingType
    };
};
