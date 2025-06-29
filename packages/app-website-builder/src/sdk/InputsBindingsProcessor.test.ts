import { InputsBindingsProcessor } from "./InputBindingsProcessor";
import type { InputAstNode } from "~/sdk/ComponentManifestToAstConverter";
import type { DocumentElementBindings } from "~/sdk/types";
import { ElementFactory } from "~/sdk/ElementFactory";

describe("InputsBindingsProcessor", () => {
    // Example simple AST (you can expand as needed)
    const simpleAst: InputAstNode[] = [
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
                label: "Title"
            }
        },
        {
            name: "items",
            type: "object",
            dataType: "object",
            list: true,
            path: "items",
            children: [
                {
                    name: "label",
                    type: "text",
                    dataType: "text",
                    list: false,
                    path: "items.label",
                    children: [],
                    input: {
                        type: "text",
                        dataType: "text",
                        name: "label",
                        label: "Label"
                    }
                }
            ],
            input: {
                type: "object",
                dataType: "object",
                name: "items",
                list: true,
                fields: [
                    {
                        type: "text",
                        dataType: "text",
                        name: "label",
                        label: "Label"
                    }
                ]
            }
        }
    ];

    const breakpoints = ["desktop", "tablet", "mobile"];

    const baseBindings: DocumentElementBindings = {
        inputs: {
            title: { static: "Base Title", type: "text", dataType: "text" },
            "items[0].label": {
                static: "Base Label 1",
                type: "text",
                dataType: "text"
            },
            "items[1].label": {
                static: "Base Label 2",
                type: "text",
                dataType: "text"
            }
        },
        styles: {}
    };

    const overrides: DocumentElementBindings["overrides"] = {
        tablet: {
            inputs: {
                title: { static: "Tablet Title", type: "text", dataType: "text" },
                "items[0].label": {
                    static: "Tablet Label 1",
                    type: "text",
                    dataType: "text"
                }
            }
        },
        mobile: {
            inputs: {
                title: { static: "Mobile Title", type: "text", dataType: "text" }
            }
        }
    };

    const getInputsBindingsProcessor = (bindings: DocumentElementBindings = baseBindings) => {
        const elementFactory = new ElementFactory({});
        const processor = new InputsBindingsProcessor(
            "elementId",
            simpleAst,
            breakpoints,
            bindings,
            elementFactory
        );

        return { processor, bindings };
    };

    it("toDeep should convert flat bindings to nested object", () => {
        const { processor } = getInputsBindingsProcessor();

        const deep = processor.toDeepInputs(baseBindings.inputs ?? {});
        expect(deep).toEqual({
            title: "Base Title",
            items: [{ label: "Base Label 1" }, { label: "Base Label 2" }]
        });
    });

    it("applyInputs should assign base breakpoint inputs correctly", () => {
        const { processor, bindings } = getInputsBindingsProcessor();

        const newInputs = {
            title: "New Base Title",
            items: [{ label: "New Label 1" }, { label: "New Label 2" }]
        };

        const updater = processor.createUpdate(newInputs, "mobile");
        const rebuilt = updater.applyToBindings(bindings);

        expect(rebuilt.inputs.title.static).toBe("New Base Title");
        expect(rebuilt.inputs["items[0].label"].static).toBe("New Label 1");
        expect(rebuilt.inputs["items[1].label"].static).toBe("New Label 2");
        expect(rebuilt.overrides).toBeUndefined();
    });

    it("applyInputs should assign overrides correctly, skipping inherited values", () => {
        const rawBindings: DocumentElementBindings = {
            inputs: baseBindings.inputs,
            overrides,
            styles: {}
        };
        const { processor, bindings } = getInputsBindingsProcessor(rawBindings);

        const newInputs = {
            title: "Mobile Title",
            items: [{ label: "Base Label 1" }, { label: "Base Label 2" }]
        };

        const updater = processor.createUpdate(newInputs, "mobile");
        const rebuilt = updater.applyToBindings(bindings);

        expect(rebuilt.inputs.title.static).toBe("Mobile Title");
        // Items are same as base, so should not be in overrides
        expect(rebuilt.overrides?.mobile.inputs?.["items[0].label"]).toBeUndefined();
    });

    it("createPatch should create correct json patch for input changes", () => {
        const rawBindings: DocumentElementBindings = {
            inputs: baseBindings.inputs,
            overrides,
            styles: {}
        };
        const { processor, bindings } = getInputsBindingsProcessor(rawBindings);

        const newInputs = {
            title: "Changed Title",
            items: [{ label: "Changed Label 1" }]
        };

        const updater = processor.createUpdate(newInputs, "mobile");
        const patch = updater.createJsonPatch(bindings);

        expect(patch).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    op: "remove",
                    path: "/inputs/items[1].label"
                }),
                expect.objectContaining({
                    op: "replace",
                    path: "/inputs/title/static",
                    value: "Changed Title"
                }),
                expect.objectContaining({
                    op: "replace",
                    path: "/inputs/items[0].label/static",
                    value: "Changed Label 1"
                })
            ])
        );
    });

    it("applyInputs removes keys missing in new inputs", () => {
        const rawBindings: DocumentElementBindings = {
            inputs: {
                ...baseBindings.inputs,
                "some.key": { static: "toRemove", type: "text", dataType: "text" }
            },
            overrides,
            styles: {}
        };
        const { processor, bindings } = getInputsBindingsProcessor(rawBindings);

        const newInputs = {
            title: "Base Title",
            items: [{ label: "Base Label 1" }, { label: "Base Label 2" }]
        };

        const updater = processor.createUpdate(newInputs, "mobile");
        const rebuilt = updater.applyToBindings(bindings);

        expect(rebuilt.inputs["some.key"]).toBeUndefined();
    });
});
