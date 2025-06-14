import { Editor } from "../Editor";
import { $getElementById } from "./$getElementById";
import { $removeElementReferenceFromParent } from "./$removeElementReferenceFromParent";

export function $deleteElement(editor: Editor, id: string) {
    const elementToDelete = $getElementById(editor, id);

    if (!elementToDelete) {
        return;
    }

    editor.updateDocument(state => {
        // Remove the reference to the element from its parent element.
        if (elementToDelete.parent) {
            $removeElementReferenceFromParent(editor, {
                elementId: id,
                parentId: elementToDelete.parent.id,
                slot: elementToDelete.parent.slot
            });
        }

        // Remove all descendants.
        Object.values(state.elements)
            .filter(el => el.parent?.id === id)
            .forEach(element => {
                $deleteElement(editor, element.id);
            });

        // Delete element bindings.
        delete state.bindings[elementToDelete.id];

        // Delete the element itself.
        delete state.elements[id];
    });
}
