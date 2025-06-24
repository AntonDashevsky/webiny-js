import type { Document, InputValueBinding } from "~/sdk/types.js";
import type { IDocumentOperation } from "./IDocumentOperation";

export class SetInputBindingOverride implements IDocumentOperation {
    private readonly elementId: string;
    private breakpoint: string;
    private readonly bindingPath: string;
    private readonly binding: InputValueBinding;

    constructor(
        elementId: string,
        bindingPath: string,
        binding: InputValueBinding,
        breakpoint: string
    ) {
        this.elementId = elementId;
        this.bindingPath = bindingPath;
        this.binding = binding;
        this.breakpoint = breakpoint;
    }

    apply(document: Document) {
        const bindings = document.bindings[this.elementId] ?? {};
        const breakpointOverrides = bindings.overrides
            ? bindings.overrides[this.breakpoint] ?? {}
            : { inputs: {} };

        const binding = breakpointOverrides.inputs
            ? breakpointOverrides.inputs[this.bindingPath]
            : {};

        document.bindings[this.elementId] = {
            ...bindings,
            overrides: {
                ...(bindings.overrides || {}),
                [this.breakpoint]: {
                    ...breakpointOverrides,
                    inputs: {
                        ...(breakpointOverrides.inputs || {}),
                        [this.bindingPath]: {
                            ...binding,
                            ...this.binding
                        }
                    }
                }
            }
        };
    }
}
