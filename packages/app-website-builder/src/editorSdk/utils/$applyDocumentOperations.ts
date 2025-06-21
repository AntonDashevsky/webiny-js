import set from "lodash/set";
import { $addElementReferenceToParent } from "~/editorSdk/utils/$addElementReferenceToParent";
import { Editor } from "~/editorSdk/Editor";
import { Operation, type SetStaticOp } from "~/sdk/ElementFactory";
import type { Document } from "~/sdk/types";
import { $deleteElement } from "~/editorSdk/utils/$deleteElement";

export const $applyDocumentOperations = (editor: Editor, operations: Operation[]) => {
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
                case "remove-element":
                    $deleteElement(editor, op.elementId);
                    break;
            }
        }
    });
};

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
