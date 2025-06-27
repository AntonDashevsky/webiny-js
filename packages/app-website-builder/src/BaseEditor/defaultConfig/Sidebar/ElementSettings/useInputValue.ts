import { useCallback, useState } from "react";
import { useDocumentEditor } from "~/DocumentEditor";
import type { InputValueBinding, ValueBinding } from "~/sdk/types";
import { Commands } from "~/BaseEditor";
import { useActiveElement } from "~/BaseEditor/hooks/useActiveElement";
import { InputAstNode } from "~/sdk/ComponentManifestToAstConverter";
import { functionConverter } from "~/sdk";
import { BindingsApi } from "~/sdk/BindingsApi";
import { useElementFactory } from "./useElementFactory";
import { useBreakpoint } from "~/BaseEditor/hooks/useBreakpoint";
import { useBindingsForElement } from "./useBindingsForElement";
import { toJS } from "mobx";
import { useElementInputsAst } from "~/BaseEditor/hooks/useElementInputsAst";

export const useInputValue = (node: InputAstNode) => {
    const { breakpoint } = useBreakpoint();
    const [element] = useActiveElement();
    const editor = useDocumentEditor();
    const inputsAst = useElementInputsAst(element?.id);

    // These bindings already include per-breakpoint overrides.
    const { resolvedBindings, inheritanceMap } = useBindingsForElement(element?.id);

    const elementFactory = useElementFactory();
    const [localState, setLocalValue] = useState<ValueBinding>();

    // This value is the final calculated breakpoint value.
    const value = resolvedBindings.inputs?.[node.path] ?? {
        static: ""
    };

    const onChange = useCallback(
        (value: any) => {
            if (!element) {
                return;
            }

            // We need to update the value taking into account the current breakpoint.
            // Non-default breakpoint value needs to go into `overrides`.

            editor.updateDocument(document => {
                // Get original bindings.
                const bindings = toJS(document.bindings[element.id] ?? { inputs: {} });

                // Update breakpoint bindings.
                const valueBinding: InputValueBinding = resolvedBindings.inputs?.[node.path] ?? {
                    type: node.type,
                    dataType: node.dataType,
                    static: ""
                };

                if (valueBinding.expression) {
                    valueBinding.expression = value === undefined ? "$noop" : value;
                } else {
                    valueBinding.static = value;
                }

                const newBindings = toJS({
                    ...resolvedBindings,
                    inputs: {
                        ...resolvedBindings.inputs,
                        [node.path]: valueBinding
                    }
                });

                const bindingsApi = new BindingsApi(
                    element.id,
                    bindings,
                    newBindings,
                    inputsAst,
                    elementFactory,
                    breakpoint.name
                );

                // Process input's `onChange`.
                if (node.input.onChange) {
                    const callback = functionConverter.deserialize(
                        // TODO: we know it's a string, but on the frontend it's a function. Fix types.
                        node.input.onChange! as any as string
                    );

                    // Run onChange callback.
                    callback(bindingsApi.getPublicApi(), {
                        breakpoint: breakpoint.name
                    });
                }

                // Set new element bindings
                document.bindings[element.id] = bindingsApi.toFlatBindings();

                // Apply operations
                const ops = bindingsApi.getOperations();
                ops.forEach(op => op.apply(document));
            });

            // Clear local value
            setLocalValue(undefined);
        },
        [element?.id, resolvedBindings, breakpoint]
    );

    const onPreviewChange = useCallback(
        (value: any) => {
            if (!element) {
                return;
            }

            setLocalValue({ static: value });

            // TODO: extract InputBindings to calculate the correct patch based on inheritance
            // TODO: BindingsApi needs to use InputBindings and StyleBindings internally
            editor.executeCommand(Commands.PreviewPatchElement, {
                elementId: element.id,
                patch: [
                    {
                        op: "replace",
                        path: `/inputs/${node.path}/static`,
                        value
                    }
                ]
            });
        },
        [element?.id]
    );

    const onReset = useCallback(() => {
        onChange(undefined);
    }, [onChange]);

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
        inheritanceMap: inheritanceMap.inputs[node.path],
        onChange,
        onPreviewChange,
        onReset,
        setBindingType
    };
};
