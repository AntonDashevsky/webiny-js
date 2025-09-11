import type { Document } from "@webiny/website-builder-sdk";
import { $getElementById } from "./$getElementById.js";
import { $removeElementReferenceFromParent } from "./$removeElementReferenceFromParent.js";

export function $deleteElement(document: Document, id: string) {
    const elementToDelete = $getElementById(document, id);

    if (!elementToDelete) {
        return;
    }

    // Remove the reference to the element from its parent element.
    if (elementToDelete.parent) {
        $removeElementReferenceFromParent(document, {
            elementId: id,
            parentId: elementToDelete.parent.id,
            slot: elementToDelete.parent.slot
        });
    }

    // Remove all descendants.
    Object.values(document.elements)
        .filter(el => el.parent?.id === id)
        .forEach(element => {
            $deleteElement(document, element.id);
        });

    // Delete element bindings.
    delete document.bindings[elementToDelete.id];

    // Delete the element itself.
    delete document.elements[id];
}
