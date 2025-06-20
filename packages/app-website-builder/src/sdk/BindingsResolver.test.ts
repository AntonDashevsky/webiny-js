import { BindingsResolver } from "./BindingsResolver";
import { DocumentElement, DocumentState, DocumentElementBindings } from "~/sdk/types";
import { createTextInput } from "~/sdk/createInput";
import { ComponentManifestToAstConverter } from "~/sdk/ComponentManifestToAstConverter";

describe("BindingsResolver", () => {
    const baseElement: DocumentElement = {
        id: "test1",
        type: "Webiny/Element",
        component: {
            name: "Webiny/Text"
        }
    };

    it("resolves input with expression binding", () => {
        const state: DocumentState = {
            user: { name: "Alice" }
        };

        const bindings: DocumentElementBindings = {
            inputs: {
                text: {
                    type: "text",
                    dataType: "string",
                    expression: "$state.user.name",
                    static: "Static fallback"
                }
            },
            styles: {
                desktop: {
                    padding: {
                        static: "10px"
                    }
                }
            }
        };

        const inputs = [createTextInput({ name: "text" })];
        const inputAst = ComponentManifestToAstConverter.convert(inputs);
        const resolver = new BindingsResolver(state, "desktop");
        const [resolved] = resolver.resolveElement({
            element: baseElement,
            inputAst,
            elementBindings: bindings
        });

        expect(resolved.inputs.text).toBe("Alice");
        expect(resolved.styles).toEqual({ padding: "10px" });
    });

    it("falls back to static if no expression is provided", () => {
        const state: DocumentState = {};

        const bindings: DocumentElementBindings = {
            inputs: {
                text: {
                    type: "text",
                    dataType: "string",
                    static: "Static only"
                }
            }
        };

        const inputs = [createTextInput({ name: "text" })];
        const inputAst = ComponentManifestToAstConverter.convert(inputs);
        const resolver = new BindingsResolver(state, "mobile");
        const [resolved] = resolver.resolveElement({
            element: baseElement,
            inputAst,
            elementBindings: bindings
        });

        expect(resolved.inputs.text).toBe("Static only");
    });

    it("uses undefined if expression fails and no static exists", () => {
        const state: DocumentState = {};

        const bindings: DocumentElementBindings = {
            inputs: {
                text: {
                    type: "text",
                    dataType: "string",
                    static: "Fallback",
                    expression: "$.unknown.value"
                }
            }
        };

        const inputs = [createTextInput({ name: "text" })];
        const inputAst = ComponentManifestToAstConverter.convert(inputs);
        const resolver = new BindingsResolver(state, "desktop");
        const [resolved] = resolver.resolveElement({
            element: baseElement,
            inputAst,
            elementBindings: bindings
        });

        expect(resolved.inputs.text).toBeUndefined();
    });

    it("handles $repeat using expression and maps items", () => {
        const state: DocumentState = {
            products: [{ title: "Shirt" }, { title: "Hat" }]
        };

        const bindings: DocumentElementBindings = {
            $repeat: {
                expression: "$state.products"
            },
            inputs: {
                text: {
                    type: "text",
                    dataType: "string",
                    expression: "$.title",
                    static: "Unnamed"
                }
            }
        };

        const inputs = [createTextInput({ name: "text" })];
        const inputAst = ComponentManifestToAstConverter.convert(inputs);
        const resolver = new BindingsResolver(state, "desktop");
        const resolved = resolver.resolveElement({
            element: baseElement,
            inputAst,
            elementBindings: bindings
        });

        expect(resolved).toHaveLength(2);
        expect(resolved[0].inputs.text).toBe("Shirt");
        expect(resolved[1].inputs.text).toBe("Hat");
    });

    it("returns empty array if $repeat doesn't resolve to an array", () => {
        const state: DocumentState = {
            invalid: 42
        };

        const bindings: DocumentElementBindings = {
            $repeat: {
                expression: "$state.invalid"
            },
            inputs: {
                text: {
                    type: "text",
                    dataType: "string",
                    static: "Should not be used"
                }
            }
        };

        const inputs = [createTextInput({ name: "text" })];
        const inputAst = ComponentManifestToAstConverter.convert(inputs);
        const resolver = new BindingsResolver(state, "desktop");
        const resolved = resolver.resolveElement({
            element: baseElement,
            inputAst,
            elementBindings: bindings
        });

        expect(resolved).toEqual([]);
    });

    it("resolves binding that refers to a specific array index", () => {
        const state: DocumentState = {
            list: [{ text: "First item text" }, { text: "Second item text" }]
        };

        const bindings: DocumentElementBindings = {
            inputs: {
                text: {
                    type: "text",
                    dataType: "string",
                    static: "Static fallback",
                    expression: "$state.list.0.text"
                }
            }
        };

        const inputs = [createTextInput({ name: "text" })];
        const inputAst = ComponentManifestToAstConverter.convert(inputs);
        const resolver = new BindingsResolver(state, "desktop");
        const [resolved] = resolver.resolveElement({
            element: baseElement,
            inputAst,
            elementBindings: bindings
        });

        expect(resolved.inputs.text).toBe("First item text");
    });
});
