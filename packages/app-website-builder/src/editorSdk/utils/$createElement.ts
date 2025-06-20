import set from "lodash/set";
import type { Document } from "~/sdk/types";
import type { Editor } from "../Editor";
import type { CommandPayload } from "~/editorSdk/createCommand";
import { Commands } from "~/BaseEditor";
import { ElementFactory, type SetStaticOp } from "~/sdk/ElementFactory";
import { $addElementReferenceToParent } from "~/editorSdk/utils/$addElementReferenceToParent";

export function $createElement(
    editor: Editor,
    payload: CommandPayload<typeof Commands.CreateElement>
) {
    const { componentName, index, parentId, slot } = payload;
    const componentsManifest = editor.getEditorState().read().components;

    const elementFactory = new ElementFactory(componentsManifest);
    const operations = elementFactory.generateOperations(
        componentName,
        parentId,
        slot,
        index,
        componentsManifest[componentName].defaults
    );

    editor.updateDocument(document => {
        for (const op of operations) {
            switch (op.type) {
                case "add-element":
                    document.elements[op.element.id] = op.element;
                    break;

                case "add-to-parent":
                    $addElementReferenceToParent(editor, op);
                    break;

                case "set-static":
                    if (op.scope === "styles") {
                        // Safe to use lodash.set because styles are nested naturally
                        set(document.bindings, `${op.elementId}.styles.${op.binding}`, {
                            static: op.value
                        });
                    } else if (op.scope === "inputs") {
                        applyInputBinding(document, op);
                    }
                    break;
            }
        }
    });
}

function applyInputBinding(document: Document, op: SetStaticOp): void {
    const bindings = (document.bindings[op.elementId] ??= {});
    const inputs = (bindings.inputs ??= {});

    const fullPath = op.binding;
    const valueEntry = {
        static: op.value,
        type: op.meta.type,
        dataType: op.meta.dataType,
        ...(op.meta.list ? { list: true } : {})
    };

    inputs[fullPath] = valueEntry;
}
