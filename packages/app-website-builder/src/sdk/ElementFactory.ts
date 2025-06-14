import { generateAlphaNumericLowerCaseId } from "@webiny/utils/generateId";
import type { Document, DocumentElement, ComponentManifest } from "~/sdk/types";
import type { Editor } from "~/editorSdk/Editor";
import { $addElementReferenceToParent } from "~/editorSdk/utils";
import { observable } from "mobx";

export class ElementFactory {
    private readonly editor: Editor;

    constructor(editor: Editor) {
        this.editor = editor;
    }

    public createElement(
        componentName: string,
        parentId: string,
        slot: string,
        index: number
    ): DocumentElement {
        const components = this.editor.getEditorState().read().components;
        const manifest: ComponentManifest | undefined = components[componentName];

        if (!manifest) {
            throw new Error(`Component manifest not found for: ${componentName}`);
        }

        const elementId = generateAlphaNumericLowerCaseId();

        const element: DocumentElement = {
            type: "Webiny/Element",
            id: elementId,
            parent: {
                id: parentId,
                slot
            },
            component: {
                name: componentName
            },
            styles: manifest.defaults?.styles || {}
        };

        const inputs = manifest.inputs || [];

        this.editor.updateDocument(doc => {
            for (const input of inputs) {
                const defaultValue = manifest.defaults?.inputs?.[input.name];

                if (Array.isArray(defaultValue) && input.type === "slot") {
                    const children: DocumentElement[] = [];

                    for (let i = 0; i < defaultValue.length; i++) {
                        const entry = defaultValue[i];
                        if (entry.action === "CreateElement") {
                            const child = this.createElement(
                                entry.params.component,
                                elementId,
                                input.name,
                                i
                            );
                            child.styles = Object.assign({}, child.styles, entry.params.styles);
                            children.push(child);
                        }
                    }

                    const childIds = children.map(el => el.id);
                    this.setInputValue(doc, element.id, input.name, childIds);

                    for (const child of children) {
                        doc.elements[child.id] = child;
                    }
                } else {
                    // Always set a binding entry, even if defaultValue is undefined
                    const value = defaultValue !== undefined ? defaultValue : null;
                    this.setInputValue(doc, element.id, input.name, value);
                }
            }

            $addElementReferenceToParent(this.editor, {
                elementId: element.id,
                parentId,
                slot,
                index
            });

            doc.elements[elementId] = element;
        });

        return element;
    }

    private setInputValue(
        document: Document,
        elementId: string,
        inputName: string,
        value: any
    ): void {
        const bindings = document.bindings[elementId] ?? {};
        bindings.inputs = { ...bindings.inputs, [inputName]: { static: value } };
        document.bindings[elementId] = observable(bindings);
    }
}
