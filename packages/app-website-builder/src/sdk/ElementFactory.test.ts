import { toJS } from "mobx";
import { Editor } from "~/editorSdk/Editor";
import type { Document } from "./types.js";
import { ElementFactory } from "./ElementFactory";

// Mock the ID generator to make tests deterministic
jest.mock("@webiny/utils/generateId", () => {
    let mockCounter = 0;
    return {
        generateAlphaNumericLowerCaseId: () => `mockId${++mockCounter}`
    };
});

const createMockEditor = () => {
    const state: Document = {
        properties: {},
        state: {},
        elements: {
            root: {
                type: "Webiny/Element" as const,
                id: "root",
                component: { name: "Webiny/Root" }
            }
        },
        bindings: {
            root: {
                inputs: {
                    children: {
                        static: []
                    }
                }
            }
        }
    };

    const editor = new Editor<Document>(JSON.parse(JSON.stringify(state)));
    editor.updateEditor(state => {
        state.components = {
            "Webiny/TwoColumns": {
                name: "Webiny/TwoColumns",
                label: "Two Columns",
                group: "basic",
                inputs: [
                    {
                        type: "text",
                        dataType: "text",
                        renderer: "Webiny/Input",
                        name: "title",
                        label: "Title"
                    },
                    {
                        type: "slot",
                        dataType: "json",
                        list: true,
                        renderer: "Webiny/Slot",
                        name: "leftColumn"
                    },
                    {
                        type: "slot",
                        dataType: "json",
                        list: true,
                        renderer: "Webiny/Slot",
                        name: "rightColumn"
                    }
                ],
                defaults: {
                    inputs: {
                        title: "My Title",
                        leftColumn: [
                            {
                                action: "CreateElement",
                                params: {
                                    component: "Webiny/Text",
                                    inputs: { text: "Left text" },
                                    styles: { desktop: { color: "red" } }
                                }
                            }
                        ],
                        rightColumn: [
                            {
                                action: "CreateElement",
                                params: {
                                    component: "Webiny/Text",
                                    inputs: { text: "Right text" },
                                    styles: { desktop: { color: "blue" } }
                                }
                            }
                        ]
                    },
                    styles: {
                        desktop: { padding: "10px" }
                    }
                }
            },
            "Webiny/Text": {
                name: "Webiny/Text",
                label: "Text",
                group: "basic",
                inputs: [
                    {
                        type: "text",
                        dataType: "text",
                        renderer: "Webiny/Input",
                        name: "text",
                        label: "Text"
                    }
                ],
                defaults: {
                    inputs: {
                        text: "Default text"
                    },
                    styles: {
                        desktop: { fontSize: "14px" }
                    }
                }
            }
        };
    });
    return editor;
};

test("ElementFactory creates and links elements with nested children", async () => {
    const mockEditor = await createMockEditor();
    const factory = new ElementFactory(mockEditor);

    const created = factory.createElement("Webiny/TwoColumns", "root", "children", 0);
    const doc = toJS(mockEditor.getDocumentState().read());

    // Root element
    expect(doc.elements[created.id]).toBeDefined();
    expect(doc.elements[created.id].component.name).toBe("Webiny/TwoColumns");

    // Root bindings
    const rootBindings = doc.bindings[created.id];
    expect(rootBindings.inputs?.title.static).toEqual("My Title");

    const leftSlot = rootBindings.inputs?.leftColumn.static;
    const rightSlot = rootBindings.inputs?.rightColumn.static;
    expect(Array.isArray(leftSlot)).toBe(true);
    expect(Array.isArray(rightSlot)).toBe(true);

    const leftChildId = leftSlot[0];
    const rightChildId = rightSlot[0];

    expect(doc.elements[leftChildId].component.name).toBe("Webiny/Text");
    expect(doc.elements[rightChildId].component.name).toBe("Webiny/Text");

    expect(doc.elements[leftChildId].styles?.desktop?.color).toBe("red");
    expect(doc.elements[rightChildId].styles?.desktop?.color).toBe("blue");

    // Parent linkage
    const childrenBinding = doc.bindings.root.inputs?.children.static;
    expect(childrenBinding).toContain(created.id);
});
