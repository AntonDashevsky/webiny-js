import set from "lodash/set";
import { toJS } from "mobx";
import {
    DocumentElement,
    DocumentState,
    ResolvedElement,
    ComponentInput,
    ValueBinding,
    DocumentElementBindings,
    SerializableCSSStyleDeclaration,
    DocumentElementStyleBindings
} from "~/sdk/types";
import type { InputAstNode } from "./ComponentManifestToAstConverter";
import { findMatchingAstNode } from "./findMatchingAstNode";

export interface OnResolved {
    (value: any, input: ComponentInput): any;
}

export type ResolveElementParams = {
    element: DocumentElement;
    elementBindings: DocumentElementBindings;
    inputAst: InputAstNode[];
    onResolved?: OnResolved;
};

export class BindingsResolver {
    private readonly state: DocumentState;
    private readonly breakpoint: string;

    constructor(state: DocumentState, breakpoint: string) {
        this.state = state;
        this.breakpoint = breakpoint;
    }

    public resolveElement({
        element,
        elementBindings,
        inputAst,
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
                    inputAst,
                    onResolved
                );
            });
        }

        return [
            this.resolveSingleInstance(element, elementBindings, undefined, inputAst, onResolved)
        ];
    }

    private resolveSingleInstance(
        element: DocumentElement,
        elementBindings: DocumentElementBindings,
        item: Record<string, any> | undefined,
        inputAst: InputAstNode[],
        onResolved?: OnResolved
    ): ResolvedElement {
        const resolvedElement: ResolvedElement = {
            id: element.id,
            inputs: {},
            styles: {}
        };

        const context = { state: this.state, $: item };
        const flatBindings = elementBindings.inputs ?? {};

        for (const [path, binding] of Object.entries(flatBindings)) {
            const value = this.resolveBinding(binding, context);
            const astNode = findMatchingAstNode(path, inputAst);

            if (!astNode) {
                // If there's no AST node found, it means this is stale data for an input that no longer exists.
                continue;
            }

            const finalValue = onResolved ? onResolved(value, astNode.input) : value;

            set(resolvedElement.inputs, path, finalValue);
        }

        // Resolve styles
        const styles: DocumentElementStyleBindings = elementBindings.styles
            ? elementBindings.styles[this.breakpoint] ?? {}
            : {};

        const resolvedStyles: SerializableCSSStyleDeclaration = {};

        for (const [path, binding] of Object.entries(styles)) {
            if (binding) {
                // @ts-expect-error We're positive this is correct.
                resolvedStyles[path] = this.resolveBinding(binding, context);
            }
        }

        return {
            ...resolvedElement,
            styles: resolvedStyles
        };
    }

    private resolveBinding(binding: ValueBinding | undefined, context: Record<string, any>): any {
        if (!binding) {
            return undefined;
        }

        if (binding.expression) {
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
