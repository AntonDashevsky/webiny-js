import { useCallback, useState } from "react";
import { useDocumentEditor } from "~/DocumentEditor";
import { useSelectFromDocument } from "~/BaseEditor/hooks/useSelectFromDocument";
import type { InputValueBinding, ValueBinding } from "~/sdk/types";
import { Commands } from "~/BaseEditor";
import { useActiveElement } from "~/BaseEditor/hooks/useActiveElement";
import {
    ComponentManifestToAstConverter,
    InputAstNode
} from "~/sdk/ComponentManifestToAstConverter";
import { functionConverter } from "~/sdk";
import { BindingsApi } from "~/sdk/BindingsApi";
import { useElementComponentManifest } from "~/BaseEditor/defaultConfig/Content/Preview/useElementComponentManifest";
import { useElementFactory } from "./useElementFactory";
import { $applyDocumentOperations } from "~/editorSdk/utils/$applyDocumentOperations";
import { useDisplayMode } from "~/BaseEditor/hooks/useDisplayMode";

export const useInputValue = (node: InputAstNode) => {
    const { displayMode } = useDisplayMode();
    const [element] = useActiveElement();
    const editor = useDocumentEditor();
    const componentManifest = useElementComponentManifest(element?.id ?? "");
    const inputsAst = componentManifest
        ? ComponentManifestToAstConverter.convert(componentManifest.inputs ?? [])
        : [];

    const elementFactory = useElementFactory();
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

                // Process input's `onChange`.
                if (node.input.onChange) {
                    const callback = functionConverter.deserialize(
                        // TODO: we know it's a string, but on the frontend it's a function. Fix types.
                        node.input.onChange! as any as string
                    );

                    const bindingsApi = new BindingsApi(
                        element.id,
                        state.bindings[element.id],
                        inputsAst,
                        elementFactory
                    );

                    // Run onChange callback.
                    callback(bindingsApi.getPublicApi(displayMode.name), {
                        displayMode: displayMode.name
                    });

                    // Set new element bindings
                    const flatBindings = bindingsApi.toFlatBindings();
                    state.bindings[element.id] = flatBindings;

                    // Apply operations
                    const ops = bindingsApi.getOperations();
                    $applyDocumentOperations(editor, ops);
                }
            });

            // Clear local value
            setLocalValue(undefined);
        },
        [element?.id, displayMode]
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
