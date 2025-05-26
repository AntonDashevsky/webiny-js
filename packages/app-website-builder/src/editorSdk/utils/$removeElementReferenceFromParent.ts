import get from "lodash/get";
import { Editor } from "../Editor";
import { DocumentElement } from "~/sdk/types";
import set from "lodash/set";

interface Params {
    elementId: string;
    parentId: string;
    slot: string;
}

export function $removeElementReferenceFromParent(
    editor: Editor,
    { elementId, parentId, slot }: Params
) {
    editor.updateDocument(state => {
        const parent = state.elements[parentId];
        const slotElements = getElementsFromSlot(parent, slot);
        setSlotElements(
            parent,
            slot,
            slotElements.filter(id => id !== elementId)
        );
    });
}

const getElementsFromSlot = (element: DocumentElement, slot: string): string[] => {
    return get(element.component.inputs, slot) ?? [];
};

const setSlotElements = (element: DocumentElement, slot: string, elements: string[]) => {
    return set(element.component.inputs, slot, elements);
};
