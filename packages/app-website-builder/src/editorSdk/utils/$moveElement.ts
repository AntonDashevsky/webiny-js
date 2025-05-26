import { Editor } from "../Editor";
import { $getElementById } from "./$getElementById";
import { $removeElementReferenceFromParent } from "./$removeElementReferenceFromParent";
import { $addElementReferenceToParent } from "./$addElementReferenceToParent";

interface MoveParams {
    // ID of the element to move.
    elementId: string;
    // Parent element for the new element.
    parentId: string;
    // Parent element slot (e.g., `children`, `heroBanner`, `tabsList.0.content`).
    slot: string;
    // Index within the slot.
    index: number;
}

export function $moveElement(editor: Editor, params: MoveParams) {
    const { elementId, index, slot, parentId } = params;

    editor.updateDocument(() => {
        const elementToMove = $getElementById(editor, elementId);

        // Remove the reference to the element from its parent element.
        if (elementToMove.parent) {
            $removeElementReferenceFromParent(editor, {
                elementId,
                parentId: elementToMove.parent.id,
                slot: elementToMove.parent.slot
            });
        }

        // Assign new parent.
        elementToMove.parent = {
            id: parentId,
            slot
        };

        // Add reference to the new parent.
        $addElementReferenceToParent(editor, {
            elementId,
            parentId,
            slot,
            index
        });
    });
}
