import { BindingsResolver } from "./BindingsResolver";
import type { DocumentElement, DocumentBindings, DocumentState } from "~/sdk/types";

describe("BindingsResolver", () => {
    const baseElement: DocumentElement = {
        id: "test1",
        type: "Webiny/Element",
        component: {
            name: "Webiny/Text",
            inputs: {
                text: "Fallback"
            }
        },
        styles: {
            desktop: {
                padding: "10px"
            },
            mobile: {
                padding: "5px"
            }
        }
    };

    it("resolves input with expression binding", () => {
        const state: DocumentState = {
            user: { name: "Alice" }
        };

        const bindings: DocumentBindings = {
            test1: {
                "component.inputs.text": [
                    { type: "expression", value: "$state.user.name" },
                    { type: "static", value: "Static fallback" }
                ]
            }
        };

        const resolver = new BindingsResolver(state, bindings, "desktop");
        const [resolved] = resolver.resolveElement(baseElement);

        expect(resolved.component.inputs.text).toBe("Alice");
        expect(resolved.styles).toEqual({ padding: "10px" });
    });

    it("falls back to static if no expression is provided", () => {
        const state: DocumentState = {};

        const bindings: DocumentBindings = {
            test1: {
                "component.inputs.text": [{ type: "static", value: "Static only" }]
            }
        };

        const resolver = new BindingsResolver(state, bindings, "mobile");
        const [resolved] = resolver.resolveElement(baseElement);

        expect(resolved.component.inputs.text).toBe("Static only");
        expect(resolved.styles).toEqual({ padding: "5px" });
    });

    it("uses undefined if expression fails and no static exists", () => {
        const state: DocumentState = {};

        const bindings: DocumentBindings = {
            test1: {
                "component.inputs.text": [{ type: "expression", value: "$.unknown.value" }]
            }
        };

        const resolver = new BindingsResolver(state, bindings, "desktop");
        const [resolved] = resolver.resolveElement(baseElement);

        expect(resolved.component.inputs.text).toBeUndefined();
    });

    it("handles $repeat using expression and maps items", () => {
        const state: DocumentState = {
            products: [{ title: "Shirt" }, { title: "Hat" }]
        };

        const bindings: DocumentBindings = {
            test1: {
                $repeat: [{ type: "expression", value: "$state.products" }],
                "component.inputs.text": [
                    { type: "expression", value: "$.title" },
                    { type: "static", value: "Unnamed" }
                ]
            }
        };

        const resolver = new BindingsResolver(state, bindings, "desktop");
        const resolved = resolver.resolveElement(baseElement);

        expect(resolved).toHaveLength(2);
        expect(resolved[0].component.inputs.text).toBe("Shirt");
        expect(resolved[1].component.inputs.text).toBe("Hat");
    });

    it("returns empty array if $repeat doesn't resolve to an array", () => {
        const state: DocumentState = {
            invalid: 42
        };

        const bindings: DocumentBindings = {
            test1: {
                $repeat: [{ type: "expression", value: "$state.invalid" }],
                "component.inputs.text": [{ type: "static", value: "Should not be used" }]
            }
        };

        const resolver = new BindingsResolver(state, bindings, "desktop");
        const resolved = resolver.resolveElement(baseElement);

        expect(resolved).toEqual([]);
    });

    it("resolves binding that refers to a specific array index", () => {
        const state: DocumentState = {
            list: [{ text: "First item text" }, { text: "Second item text" }]
        };

        const bindings: DocumentBindings = {
            test1: {
                "component.inputs.text": [
                    {
                        type: "static",
                        value: "Static fallback"
                    },
                    {
                        type: "expression",
                        value: "$state.list.0.text"
                    }
                ]
            }
        };

        const resolver = new BindingsResolver(state, bindings, "desktop");
        const [resolved] = resolver.resolveElement(baseElement);

        expect(resolved.component.inputs.text).toBe("First item text");
    });
});
