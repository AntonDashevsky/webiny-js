import { BindingsResolver } from "./BindingsResolver";
import {
    DocumentElement,
    DocumentState,
    DocumentElementBindings,
    DocumentBindings
} from "~/sdk/types";
import { createSlotInput, createTextInput } from "~/sdk/createInput";
import { ComponentManifestToAstConverter } from "~/sdk/ComponentManifestToAstConverter";

describe("BindingsResolver", () => {
    const baseElement: DocumentElement = {
        id: "test1",
        type: "Webiny/Element",
        component: {
            name: "Webiny/Text"
        }
    };

    const rootElement: DocumentElement = {
        id: "root",
        type: "Webiny/Element",
        component: {
            name: "Webiny/Root"
        }
    };

    it("resolves input with expression binding", () => {
        const state: DocumentState = {
            user: { name: "Alice" }
        };

        const bindings: DocumentElementBindings = {
            inputs: {
                text: {
                    id: "text",
                    type: "text",
                    dataType: "string",
                    expression: "$state.user.name",
                    static: "Static fallback"
                }
            },
            styles: {
                padding: {
                    static: "10px"
                }
            }
        };

        const inputs = [createTextInput({ name: "text" })];
        const inputAst = ComponentManifestToAstConverter.convert(inputs);
        const resolver = new BindingsResolver(state);
        const [resolved] = resolver.resolveElement({
            element: baseElement,
            inputAst,
            elementBindings: bindings
        });

        expect(resolved.inputs.text).toBe("Alice");
        expect(resolved.styles).toEqual({ padding: "10px" });
    });

    it("resolves nested objects", () => {
        const state: DocumentState = {};

        const bindings: DocumentBindings = {
            root: {
                inputs: {
                    children: {
                        id: "children",
                        type: "slot",
                        dataType: "string",
                        list: true,
                        static: ["qizw1hgqjvj8g5a43szzc"]
                    }
                }
            },
            qizw1hgqjvj8g5a43szzc: {
                inputs: {
                    title: {
                        id: "title",
                        static: "Default Columns Title",
                        type: "text",
                        dataType: "text"
                    },
                    "leftColumn/0": {
                        id: "slot",
                        static: ["7znyr9z2cpizegnrk2rhu"],
                        type: "slot",
                        dataType: "string",
                        list: true
                    },
                    "rightColumn/0": {
                        id: "slot",
                        static: ["cwld8kxy0qhhtaql42lr5"],
                        type: "slot",
                        dataType: "string",
                        list: true
                    }
                },
                styles: {
                    padding: {
                        static: "20px"
                    },
                    backgroundColor: {
                        static: "#5c9a12"
                    }
                }
            },
            "7znyr9z2cpizegnrk2rhu": {
                inputs: {
                    title: {
                        id: "title",
                        static: "Left Column Title",
                        type: "text",
                        dataType: "text"
                    },
                    children: {
                        id: "slot",
                        static: [],
                        type: "slot",
                        dataType: "string",
                        list: true
                    }
                },
                styles: {
                    backgroundColor: {
                        static: "red"
                    },
                    marginTop: {
                        static: "20px"
                    }
                }
            },
            cwld8kxy0qhhtaql42lr5: {
                inputs: {
                    title: {
                        id: "title",
                        static: "Right Column Title",
                        type: "text",
                        dataType: "text"
                    },
                    children: {
                        id: "slot",
                        static: [],
                        type: "slot",
                        dataType: "string",
                        list: true
                    }
                },
                styles: {
                    backgroundColor: {
                        static: "blue"
                    },
                    marginTop: {
                        static: "20px"
                    }
                }
            }
        };

        const elements = {
            root: {
                type: "Webiny/Element",
                id: "root",
                component: {
                    name: "Webiny/Root"
                }
            },
            qizw1hgqjvj8g5a43szzc: {
                type: "Webiny/Element",
                id: "qizw1hgqjvj8g5a43szzc",
                parent: {
                    id: "root",
                    slot: "children"
                },
                component: {
                    name: "Webiny/TwoColumns"
                }
            },
            "7znyr9z2cpizegnrk2rhu": {
                type: "Webiny/Element",
                id: "7znyr9z2cpizegnrk2rhu",
                parent: {
                    id: "qizw1hgqjvj8g5a43szzc",
                    slot: "leftColumn/0"
                },
                component: {
                    name: "Webiny/TextWithDropzone"
                }
            },
            cwld8kxy0qhhtaql42lr5: {
                type: "Webiny/Element",
                id: "cwld8kxy0qhhtaql42lr5",
                parent: {
                    id: "qizw1hgqjvj8g5a43szzc",
                    slot: "rightColumn/0"
                },
                component: {
                    name: "Webiny/TextWithDropzone"
                }
            }
        };

        const inputs = [
            {
                type: "text",
                dataType: "text",
                renderer: "Webiny/Input",
                name: "title",
                label: "Title",
                fields: []
            },
            {
                type: "slot",
                dataType: "string",
                list: true,
                renderer: "Webiny/Slot",
                name: "leftColumn",
                fields: []
            },
            {
                type: "slot",
                dataType: "string",
                list: true,
                renderer: "Webiny/Slot",
                name: "rightColumn",
                fields: []
            }
        ];
        const inputAst = ComponentManifestToAstConverter.convert(inputs);
        const resolver = new BindingsResolver(state);
        const [resolved] = resolver.resolveElement({
            element: elements["qizw1hgqjvj8g5a43szzc"] as DocumentElement,
            inputAst,
            elementBindings: bindings["qizw1hgqjvj8g5a43szzc"]
        });

        expect(resolved.inputs.title).toBe("Default Columns Title");
        expect(resolved.inputs.leftColumn).toEqual([["7znyr9z2cpizegnrk2rhu"]]);
        expect(resolved.inputs.rightColumn).toEqual([["cwld8kxy0qhhtaql42lr5"]]);
    });

    it("falls back to static if no expression is provided", () => {
        const state: DocumentState = {};

        const bindings: DocumentElementBindings = {
            inputs: {
                text: {
                    id: "text",
                    type: "text",
                    dataType: "string",
                    static: "Static only"
                }
            }
        };

        const inputs = [createTextInput({ name: "text" })];
        const inputAst = ComponentManifestToAstConverter.convert(inputs);
        const resolver = new BindingsResolver(state);
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
                    id: "text",
                    type: "text",
                    dataType: "string",
                    static: "Fallback",
                    expression: "$.unknown.value"
                }
            }
        };

        const inputs = [createTextInput({ name: "text" })];
        const inputAst = ComponentManifestToAstConverter.convert(inputs);
        const resolver = new BindingsResolver(state);
        const [resolved] = resolver.resolveElement({
            element: baseElement,
            inputAst,
            elementBindings: bindings
        });

        expect(resolved.inputs.text).toBeUndefined();
    });

    it("uses input's `defaultValue` if binding doesn't exist", () => {
        const state: DocumentState = {};

        const bindings: DocumentElementBindings = {
            inputs: {}
        };

        const inputs = [createSlotInput({ name: "children", defaultValue: [] })];
        const inputAst = ComponentManifestToAstConverter.convert(inputs);
        const resolver = new BindingsResolver(state);
        const [resolved] = resolver.resolveElement({
            element: rootElement,
            inputAst,
            elementBindings: bindings,
            onResolved(value, input) {
                if (input.type === "slot") {
                    return "slot";
                }

                return value;
            }
        });

        expect(resolved.inputs.children).toEqual("slot");
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
                    id: "text",
                    type: "text",
                    dataType: "string",
                    expression: "$.title",
                    static: "Unnamed"
                }
            }
        };

        const inputs = [createTextInput({ name: "text" })];
        const inputAst = ComponentManifestToAstConverter.convert(inputs);
        const resolver = new BindingsResolver(state);
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
                    id: "text",
                    type: "text",
                    dataType: "string",
                    static: "Should not be used"
                }
            }
        };

        const inputs = [createTextInput({ name: "text" })];
        const inputAst = ComponentManifestToAstConverter.convert(inputs);
        const resolver = new BindingsResolver(state);
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
                    id: "text",
                    type: "text",
                    dataType: "string",
                    static: "Static fallback",
                    expression: "$state.list.0.text"
                }
            }
        };

        const inputs = [createTextInput({ name: "text" })];
        const inputAst = ComponentManifestToAstConverter.convert(inputs);
        const resolver = new BindingsResolver(state);
        const [resolved] = resolver.resolveElement({
            element: baseElement,
            inputAst,
            elementBindings: bindings
        });

        expect(resolved.inputs.text).toBe("First item text");
    });
});
