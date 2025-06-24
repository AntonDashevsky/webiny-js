import { useCallback, useState } from "react";
import { useDocumentEditor } from "~/DocumentEditor";
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
import { useBreakpoint } from "~/BaseEditor/hooks/useBreakpoint";
import { useBindingsForElement } from "./useBindingsForElement";

export const useInputValue = (node: InputAstNode) => {
    const { breakpoint } = useBreakpoint();
    const [element] = useActiveElement();
    const editor = useDocumentEditor();
    const componentManifest = useElementComponentManifest(element?.id ?? "");
    const inputsAst = componentManifest
        ? ComponentManifestToAstConverter.convert(componentManifest.inputs ?? [])
        : [];

    // These bindings already include per-breakpoint overrides.
    const bindings = useBindingsForElement(element?.id);

    const elementFactory = useElementFactory();
    const [localState, setLocalValue] = useState<ValueBinding>();

    const value = bindings.inputs?.[node.path] ?? {
        static: ""
    };

    const onChange = useCallback(
        (value: any) => {
            if (!element) {
                return;
            }

            editor.updateDocument(document => {
                const bindings = document.bindings[element.id] ?? { inputs: {} };
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

                document.bindings[element.id] = {
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
                        document.bindings[element.id],
                        inputsAst,
                        elementFactory,
                        breakpoint.name
                    );

                    // Run onChange callback.
                    callback(bindingsApi.getPublicApi(), {
                        breakpoint: breakpoint.name
                    });

                    // Set new element bindings
                    const flatBindings = bindingsApi.toFlatBindings();
                    document.bindings[element.id] = flatBindings;

                    // Apply operations
                    const ops = bindingsApi.getOperations();
                    ops.forEach(op => op.apply(document));
                }
            });

            // Clear local value
            setLocalValue(undefined);
        },
        [element?.id, breakpoint]
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
