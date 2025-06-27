import { BindingsApi } from "./BindingsApi";
import { ElementFactory } from "~/sdk/ElementFactory";
import type { DocumentElementBindings } from "~/sdk/types";
import type { InputAstNode } from "./ComponentManifestToAstConverter";
import { BindingsProcessor } from "~/sdk/BindingsProcessor";

const createTestAst = (): InputAstNode[] => [
    {
        name: "title",
        type: "text",
        dataType: "text",
        list: false,
        path: "title",
        children: [],
        input: {
            type: "text",
            dataType: "text",
            name: "title",
            label: "Title",
            fields: []
        }
    },
    {
        name: "padding",
        type: "text",
        dataType: "string",
        list: false,
        path: "padding",
        children: [],
        input: {
            type: "text",
            dataType: "string",
            name: "padding",
            label: "Padding",
            responsive: true,
            fields: []
        }
    },
    {
        name: "rowGap",
        type: "text",
        dataType: "string",
        list: false,
        path: "rowGap",
        children: [],
        input: {
            type: "text",
            dataType: "string",
            name: "rowGap",
            label: "Row Gap",
            responsive: true,
            fields: []
        }
    },
    {
        name: "colGap",
        type: "text",
        dataType: "string",
        list: false,
        path: "colGap",
        children: [],
        input: {
            type: "text",
            dataType: "string",
            name: "colGap",
            label: "Column Gap",
            fields: []
        }
    }
];

const createMockFactory = (): ElementFactory => {
    return {
        generateOperations: jest.fn(() => []) as any
    } as unknown as ElementFactory;
};

describe("BindingsApi", () => {
    it("should collect static inputs correctly", () => {
        const bindings: DocumentElementBindings = {
            inputs: {
                title: {
                    static: "Welcome",
                    type: "text",
                    dataType: "text"
                }
            },
            styles: {}
        };

        const ast = createTestAst();
        const factory = createMockFactory();
        const api = new BindingsApi("element1", bindings, bindings, ast, factory, "desktop");

        const pub = api.getPublicApi();
        pub.inputs.title = "New Title";

        const flat = api.toFlatBindings();
        expect(flat.inputs["title"].static).toBe("New Title");
    });

    it("should correctly track global values and responsive overrides", () => {
        const baseBindings: DocumentElementBindings = {
            inputs: {
                title: {
                    static: "desktop",
                    type: "text",
                    dataType: "string"
                },
                padding: {
                    static: "desktop",
                    type: "text",
                    dataType: "string"
                },
                rowGap: {
                    static: "desktop",
                    type: "text",
                    dataType: "string"
                },
                colGap: {
                    static: "desktop",
                    type: "text",
                    dataType: "string"
                }
            },
            styles: {
                color: {
                    static: "desktop"
                }
            },
            overrides: {
                tablet: {
                    inputs: {
                        padding: {
                            static: "tablet",
                            type: "text",
                            dataType: "string"
                        }
                    },
                    styles: {
                        color: {
                            static: "tablet"
                        },
                        backgroundColor: {
                            static: "tablet"
                        }
                    }
                }
            }
        };
        const ast = createTestAst();
        const processor = new BindingsProcessor(["desktop", "tablet", "mobile"]);
        const breakpointBindings = processor.getBindings(baseBindings, "mobile");

        const factory = createMockFactory();
        const api = new BindingsApi(
            "element2",
            baseBindings,
            breakpointBindings,
            ast,
            factory,
            "mobile"
        );

        const publicApi = api.getPublicApi();

        // Make changes to the inputs.
        // `title` is non-responsive, so changes are global.
        publicApi.inputs.title = "New Title";
        // `padding` is responsive, so this should create a `mobile` breakpoint override.
        publicApi.inputs.padding = "mobile";
        publicApi.styles.backgroundColor = "mobile";

        const flat = api.toFlatBindings();
        expect(flat).toMatchObject({
            inputs: {
                title: {
                    static: "New Title",
                    type: "text",
                    dataType: "text",
                    list: false
                },
                padding: {
                    static: "desktop",
                    type: "text",
                    dataType: "string"
                },
                rowGap: {
                    static: "desktop",
                    type: "text",
                    dataType: "string"
                },
                colGap: {
                    static: "desktop",
                    type: "text",
                    dataType: "string"
                }
            },
            styles: {
                color: {
                    static: "desktop"
                }
            },
            overrides: {
                tablet: {
                    inputs: {
                        padding: {
                            static: "tablet",
                            type: "text",
                            dataType: "string"
                        }
                    },
                    styles: {
                        color: {
                            static: "tablet"
                        },
                        backgroundColor: {
                            static: "tablet"
                        }
                    }
                },
                mobile: {
                    inputs: {
                        padding: {
                            static: "mobile",
                            type: "text",
                            dataType: "string"
                        }
                    },
                    styles: {
                        backgroundColor: {
                            static: "mobile"
                        }
                    }
                }
            }
        });

        expect(flat.overrides.tablet.inputs.title).toBeUndefined();
        expect(flat.overrides.tablet.inputs.rowGap).toBeUndefined();
        expect(flat.overrides.tablet.inputs.colGap).toBeUndefined();
        expect(flat.overrides.mobile.inputs.title).toBeUndefined();
        expect(flat.overrides.mobile.inputs.rowGap).toBeUndefined();
        expect(flat.overrides.mobile.inputs.colGap).toBeUndefined();
        expect(flat.overrides.mobile.styles.color).toBeUndefined();
    });

    it("should unset value if it's the same as in the parent breakpoint", () => {
        const baseBindings: DocumentElementBindings = {
            inputs: {
                padding: {
                    static: "desktop",
                    type: "text",
                    dataType: "string"
                }
            },
            overrides: {
                tablet: {
                    inputs: {
                        padding: {
                            static: "tablet",
                            type: "text",
                            dataType: "string"
                        }
                    }
                }
            }
        };

        const ast = createTestAst();
        const processor = new BindingsProcessor(["desktop", "tablet", "mobile"]);
        const breakpointBindings = processor.getBindings(baseBindings, "tablet");

        const factory = createMockFactory();
        const api = new BindingsApi(
            "element2",
            baseBindings,
            breakpointBindings,
            ast,
            factory,
            "mobile"
        );

        const publicApi = api.getPublicApi();

        // Make changes to the inputs.
        // `padding` value is the same as in the `tablet` breakpoint, so it should not be persisted.
        publicApi.inputs.padding = "new";

        const flat = api.toFlatBindings();
        expect(flat).toMatchObject({
            inputs: {
                padding: {
                    static: "desktop",
                    type: "text",
                    dataType: "string"
                }
            },
            overrides: {
                tablet: {
                    inputs: {
                        padding: {
                            static: "tablet",
                            type: "text",
                            dataType: "string"
                        }
                    }
                }
            }
        });
    });
});
