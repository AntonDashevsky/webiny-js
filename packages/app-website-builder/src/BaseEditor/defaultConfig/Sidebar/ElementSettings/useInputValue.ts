import { useCallback, useMemo, useState } from "react";
import { useDocumentEditor } from "~/DocumentEditor";
import type { ValueBinding } from "~/sdk/types";
import { Commands } from "~/BaseEditor";
import { useActiveElement } from "~/BaseEditor/hooks/useActiveElement";
import { InputAstNode } from "~/sdk/ComponentManifestToAstConverter";
import { functionConverter } from "~/sdk";
import { useElementFactory } from "./useElementFactory";
import { useBreakpoint } from "~/BaseEditor/hooks/useBreakpoint";
import { useBindingsForElement } from "./useBindingsForElement";
import { useElementInputsAst } from "~/BaseEditor/hooks/useElementInputsAst";
import { InputsBindingsProcessor } from "~/sdk/InputBindingsProcessor";
import { StylesBindingsProcessor } from "~/sdk/StylesBindingsProcessor";
import {
    BreakpointElementMetadata,
    ElementMetadata,
    IElementMetadata,
    InputMetadata,
    NullElementMetadata
} from "~/sdk/ElementMetadata";
import { createElement, CreateElementParams } from "~/sdk/createElement";
import set from "lodash/set";
import { generateAlphaNumericLowerCaseId } from "@webiny/utils/generateId";

export type OnChangeParams = {
    value: ValueObject;
    metadata: IElementMetadata;
};

export type InputBindingOnChange = (cb: (params: OnChangeParams) => void) => void;

class ValueObject {
    private value: any;

    constructor(value: any) {
        this.value = value;
    }

    set(value: any) {
        this.value = value;
    }

    get() {
        return this.value;
    }
}

function convertBracketPathToDotPath(path: string): string {
    return path.replace(/\[(\d+)\]/g, ".$1");
}

export const useInputValue = (node: InputAstNode) => {
    const { breakpoint, breakpoints } = useBreakpoint();
    const [element] = useActiveElement();
    const editor = useDocumentEditor();
    const inputsAst = useElementInputsAst(element?.id);
    const elementFactory = useElementFactory();

    const breakpointNames = useMemo(() => breakpoints.map(bp => bp.name), []);

    // These bindings already include per-breakpoint overrides.
    const { rawBindings, resolvedBindings, inheritanceMap } = useBindingsForElement(element?.id);

    const stylesProcessor = useMemo(() => {
        return new StylesBindingsProcessor(element?.id ?? "", breakpointNames, rawBindings);
    }, [element?.id, rawBindings]);

    const inputsProcessor = useMemo(() => {
        return new InputsBindingsProcessor(
            element?.id ?? "",
            inputsAst,
            breakpointNames,
            rawBindings,
            elementFactory
        );
    }, [element?.id, rawBindings]);

    // This value is the final calculated breakpoint value.
    const value = resolvedBindings.inputs[node.path];

    const inputMetadata = useMemo((): IElementMetadata => {
        if (!element) {
            return new NullElementMetadata();
        }

        let elementMetadata: IElementMetadata = new ElementMetadata(
            element.id,
            rawBindings.metadata
        );

        if (node.input.responsive) {
            elementMetadata = new BreakpointElementMetadata(
                breakpointNames,
                breakpoint.name,
                elementMetadata
            );
        }

        const valueId = value?.id ?? generateAlphaNumericLowerCaseId();

        return new InputMetadata(valueId, elementMetadata);
    }, [element?.id, breakpoint.name, rawBindings]);

    const [localState, setLocalValue] = useState<ValueBinding>();

    const onChange = useCallback(
        (cb: (params: OnChangeParams) => void) => {
            if (!element) {
                return;
            }

            const deepInputs = inputsProcessor.toDeepInputs(resolvedBindings.inputs);

            const valueObject = new ValueObject(value);

            const updaterInput = {
                value: valueObject,
                metadata: inputMetadata
            };

            // Change the input value (and metadata).
            cb(updaterInput);

            const valuePath = convertBracketPathToDotPath(node.path);
            const devFriendlyInputs = set(
                structuredClone(deepInputs),
                valuePath,
                valueObject.get()
            );
            const devFriendlyStyles = stylesProcessor.toDeepStyles(rawBindings.styles ?? {});

            // Process input's `onChange`.
            if (node.input.onChange) {
                const callback = functionConverter.deserialize(
                    // TODO: we know it's a string, but on the frontend it's a function. Fix types.
                    node.input.onChange! as any as string
                );

                // Run onChange callback.
                const publicApi = {
                    inputs: devFriendlyInputs,
                    styles: devFriendlyStyles,
                    createElement: (params: CreateElementParams) => {
                        return createElement(params);
                    }
                };

                // Run input's `onChange` callback.
                callback(publicApi, {
                    breakpoint: breakpoint.name
                });
            }

            editor.updateDocument(document => {
                const inputs = inputsProcessor.createUpdate(devFriendlyInputs, breakpoint.name);
                const styles = stylesProcessor.createUpdate(devFriendlyStyles, breakpoint.name);

                inputs.applyToDocument(document);
                styles.applyToDocument(document);

                inputMetadata.applyToDocument(document);
            });

            // Clear local value
            setLocalValue(undefined);
        },
        [element?.id, resolvedBindings, breakpoint]
    );

    /**
     * In preview, we do not update the editor document. Instead, we create a patch and send it to the preview app.
     */
    const onPreviewChange = useCallback(
        (cb: (params: OnChangeParams) => void) => {
            if (!element) {
                return;
            }

            const deepInputs = inputsProcessor.toDeepInputs(resolvedBindings.inputs);

            const valueObject = new ValueObject(value);

            const updaterInput = {
                value: valueObject,
                metadata: inputMetadata
            };

            // Change the input value (and metadata).
            cb(updaterInput);

            const valuePath = convertBracketPathToDotPath(node.path);
            const devFriendlyInputs = set(
                structuredClone(deepInputs),
                valuePath,
                valueObject.get()
            );

            setLocalValue(devFriendlyInputs);

            const updatedInputs = inputsProcessor.createUpdate(devFriendlyInputs, breakpoint.name);

            editor.executeCommand(Commands.PreviewPatchElement, {
                elementId: element.id,
                patch: updatedInputs.createJsonPatch(rawBindings)
            });
        },
        [element?.id, rawBindings]
    );

    const setBindingType = useCallback(
        (type: "static" | "expression") => {
            if (!element) {
                return;
            }

            editor.updateDocument(state => {
                const bindings = state.bindings[element.id];
                const valueBinding = bindings.inputs![node.path];

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

    const onReset = useCallback(() => {
        onChange(({ value, metadata }) => {
            value.set(undefined);
            metadata.unset("*");
        });
    }, [onChange]);

    return {
        value: localState ?? value?.static ?? "",
        metadata: inputMetadata,
        inheritanceMap: inheritanceMap.inputs[node.path],
        onReset,
        onChange,
        onPreviewChange,
        setBindingType
    };
};
