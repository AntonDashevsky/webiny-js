import set from "lodash/set";
import { toJS } from "mobx";
import type {
    DocumentElement,
    DocumentState,
    ResolvedElement,
    ComponentInput,
    ValueBinding,
    DocumentElementBindings
} from "~/sdk/types";

export interface OnResolved {
    (value: any, input: ComponentInput): any;
}

export type ResolveElementParams = {
    element: DocumentElement;
    elementBindings: DocumentElementBindings;
    inputs: ComponentInput[];
    onResolved?: OnResolved;
};

export class BindingsResolver {
    private readonly state: DocumentState;
    private readonly displayMode: string;

    constructor(state: DocumentState, displayMode: string) {
        this.state = state;
        this.displayMode = displayMode;
    }

    public resolveElement({
        element,
        elementBindings,
        inputs,
        onResolved
    }: ResolveElementParams): ResolvedElement[] {
        const repeatBindingArray = elementBindings.$repeat;

        if (repeatBindingArray) {
            const items = this.resolveBinding(repeatBindingArray, { state: toJS(this.state) });

            if (!Array.isArray(items)) {
                console.warn("Expected array from $repeat binding.");
                return [];
            }

            return items.map(item => {
                return this.resolveSingleInstance(
                    element,
                    elementBindings,
                    item,
                    inputs,
                    onResolved
                );
            });
        }

        return [
            this.resolveSingleInstance(element, elementBindings, undefined, inputs, onResolved)
        ];
    }

    private resolveSingleInstance(
        element: DocumentElement,
        elementBindings: DocumentElementBindings,
        item: Record<string, any> | undefined,
        inputs: ComponentInput[],
        onResolved?: OnResolved
    ) {
        const resolvedElement: ResolvedElement = {
            id: element.id,
            inputs: {},
            styles: {}
        };

        const context = { state: this.state, $: item };

        for (const input of inputs) {
            const binding = elementBindings.inputs?.[input.name];

            if (binding) {
                const value = this.resolveBinding(binding, context);

                if (onResolved) {
                    set(resolvedElement, `inputs.${input.name}`, onResolved(value, input));
                } else {
                    set(resolvedElement, `inputs.${input.name}`, value);
                }
            } else {
                if (onResolved) {
                    // If there's no binding, then there's also no value. Pass `undefined`.
                    set(resolvedElement, `inputs.${input.name}`, onResolved(undefined, input));
                }
            }
        }

        return {
            ...resolvedElement,
            // TODO: resolve styles bindings
            styles: element.styles ? element.styles[this.displayMode] : {}
        };
    }

    private resolveBinding(binding: ValueBinding | undefined, context: Record<string, any>): any {
        if (!binding) {
            return undefined;
        }

        if ("expression" in binding) {
            return this.evaluateExpression(binding.expression, context);
        }

        if (binding.static) {
            return binding.static;
        }

        return undefined;
    }

    private evaluateExpression(expression: string | undefined, context: Record<string, any> = {}) {
        if (!expression || expression === "$noop") {
            return undefined;
        }

        try {
            let finalExpression = expression.trim();

            if (finalExpression.startsWith("$state")) {
                finalExpression = finalExpression.replace(/^\$state/, "state");
            }

            finalExpression = finalExpression.replace(/\.([0-9]+)/g, "[$1]");

            const scopedFn = new Function(...Object.keys(context), `return ${finalExpression};`);
            return scopedFn(...Object.values(context));
        } catch (e) {
            console.warn(`Failed to evaluate expression: "${expression}"`, e);
            return undefined;
        }
    }
}
