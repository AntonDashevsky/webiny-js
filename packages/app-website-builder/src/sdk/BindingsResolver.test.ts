// @ts-nocheck Fix later.
import { BindingsResolver } from "./BindingsResolver";
import type { DocumentElement, DocumentBindings, DocumentState } from "~/sdk/types";
import { createTextInput } from "~/sdk/createInput";

describe("BindingsResolver", () => {
    const baseElement: DocumentElement = {
        id: "test1",
        type: "Webiny/Element",
        component: {
            name: "Webiny/Text"
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
                inputs: {
                    text: {
                        expression: "$state.user.name",
                        static: "Static fallback"
                    }
                }
            }
        };

        const resolver = new BindingsResolver(state, bindings, "desktop");
        const [resolved] = resolver.resolveElement(baseElement, [
            createTextInput({ name: "text" })
        ]);

        expect(resolved.inputs.text).toBe("Alice");
        expect(resolved.styles).toEqual({ padding: "10px" });
    });

    it("falls back to static if no expression is provided", () => {
        const state: DocumentState = {};

        const bindings: DocumentBindings = {
            test1: {
                inputs: {
                    text: {
                        static: "Static only"
                    }
                }
            }
        };

        const resolver = new BindingsResolver(state, bindings, "mobile");
        const [resolved] = resolver.resolveElement(baseElement, [
            createTextInput({ name: "text" })
        ]);

        expect(resolved.inputs.text).toBe("Static only");
        expect(resolved.styles).toEqual({ padding: "5px" });
    });

    it("uses undefined if expression fails and no static exists", () => {
        const state: DocumentState = {};

        const bindings: DocumentBindings = {
            test1: {
                inputs: {
                    text: {
                        expression: "$.unknown.value"
                    }
                }
            }
        };

        const resolver = new BindingsResolver(state, bindings, "desktop");
        const [resolved] = resolver.resolveElement(baseElement, []);

        expect(resolved.inputs.text).toBeUndefined();
    });

    it("handles $repeat using expression and maps items", () => {
        const state: DocumentState = {
            products: [{ title: "Shirt" }, { title: "Hat" }]
        };

        const bindings: DocumentBindings = {
            test1: {
                $repeat: {
                    expression: "$state.products"
                },
                inputs: {
                    text: {
                        expression: "$.title",
                        static: "Unnamed"
                    }
                }
            }
        };

        const resolver = new BindingsResolver(state, bindings, "desktop");
        const resolved = resolver.resolveElement(baseElement, [createTextInput({ name: "text" })]);

        expect(resolved).toHaveLength(2);
        expect(resolved[0].inputs.text).toBe("Shirt");
        expect(resolved[1].inputs.text).toBe("Hat");
    });

    it("returns empty array if $repeat doesn't resolve to an array", () => {
        const state: DocumentState = {
            invalid: 42
        };

        const bindings: DocumentBindings = {
            test1: {
                $repeat: {
                    expression: "$state.invalid"
                },
                inputs: {
                    text: {
                        static: "Should not be used"
                    }
                }
            }
        };

        const resolver = new BindingsResolver(state, bindings, "desktop");
        const resolved = resolver.resolveElement(baseElement, []);

        expect(resolved).toEqual([]);
    });

    it("resolves binding that refers to a specific array index", () => {
        const state: DocumentState = {
            list: [{ text: "First item text" }, { text: "Second item text" }]
        };

        const bindings: DocumentBindings = {
            test1: {
                inputs: {
                    text: {
                        static: "Static fallback",
                        expression: "$state.list.0.text"
                    }
                }
            }
        };

        const resolver = new BindingsResolver(state, bindings, "desktop");
        const [resolved] = resolver.resolveElement(baseElement, [
            createTextInput({ name: "text" })
        ]);

        expect(resolved.inputs.text).toBe("First item text");
    });
});
