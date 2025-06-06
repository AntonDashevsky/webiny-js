import cloneDeep from "lodash/cloneDeep";
import set from "lodash/set";
import { toJS } from "mobx";
import type {
    DocumentBindings,
    DocumentElement,
    DocumentState,
    ExpressionBinding,
    ResolvedElement,
    StaticBinding
} from "~/sdk/types";

type Binding = ExpressionBinding | StaticBinding;

const isExpressionBinding = (
    binding: StaticBinding | ExpressionBinding | undefined
): binding is ExpressionBinding => {
    return binding?.type === "expression";
};

export class BindingsResolver {
    private readonly state: DocumentState;
    private readonly bindings: DocumentBindings;
    private readonly displayMode: string;

    constructor(state: DocumentState, bindings: DocumentBindings, displayMode: string) {
        this.state = state;
        this.bindings = bindings;
        this.displayMode = displayMode;
    }

    public resolveElement(element: DocumentElement): ResolvedElement[] {
        const elementBindings = this.bindings?.[element.id] || {};
        const repeatBindingArray = elementBindings.$repeat as Binding[] | undefined;

        if (repeatBindingArray) {
            const items = this.resolveBindingArray(repeatBindingArray, { state: toJS(this.state) });
            if (!Array.isArray(items)) {
                console.warn("Expected array from $repeat binding.");
                return [];
            }
            return items.map(item => this.resolveSingleInstance(element, item));
        }

        return [this.resolveSingleInstance(element)];
    }

    private resolveSingleInstance(originalElement: DocumentElement, item?: Record<string, any>) {
        const element = cloneDeep(originalElement);
        const context = { state: this.state, $: item };
        const elementBindings = this.bindings?.[element.id] || {};

        for (const [key, bindingArray] of Object.entries(elementBindings)) {
            if (key.startsWith("$")) {
                continue; // skip system bindings
            }

            const value = this.resolveBindingArray(bindingArray, context);
            set(element, key, value);
        }

        return {
            ...element,
            styles: element.styles ? element.styles[this.displayMode] : {}
        };
    }

    private resolveBindingArray(
        bindings: Array<StaticBinding | ExpressionBinding> | undefined,
        context: Record<string, any>
    ): any {
        if (!Array.isArray(bindings)) {
            return undefined;
        }

        const expressionBinding = bindings.find(b => b.type === "expression");
        const staticBinding = bindings.find(b => b.type === "static");

        if (isExpressionBinding(expressionBinding)) {
            return this.evaluateExpression(expressionBinding.value, context);
        }

        if (staticBinding) {
            return staticBinding.value;
        }

        return undefined;
    }

    private evaluateExpression(expression: string, context: Record<string, any> = {}) {
        if (!expression) {
            return undefined;
        }

        try {
            let finalExpression = expression.trim();

            // Replace `$state` with `state`
            if (finalExpression.startsWith("$state")) {
                finalExpression = finalExpression.replace(/^\$state/, "state");
            }

            // Replace any `.123` with `[123]` to fix invalid JS syntax
            finalExpression = finalExpression.replace(/\.([0-9]+)/g, "[$1]");

            const scopedFn = new Function(...Object.keys(context), `return ${finalExpression};`);
            return scopedFn(...Object.values(context));
        } catch (e) {
            console.warn(`Failed to evaluate expression: "${expression}"`, e);
            return undefined;
        }
    }
}
