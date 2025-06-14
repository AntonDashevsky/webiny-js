import get from "lodash/get";
import set from "lodash/set";
import { Editor } from "../Editor";

interface Params {
    elementId: string;
    parentId: string;
    slot: string;
    index: number;
}

export function $addElementReferenceToParent(
    editor: Editor,
    { elementId, parentId, slot, index }: Params
) {
    editor.updateDocument(state => {
        const elementBindings = state.bindings[parentId] ?? {};
        const slotElements = (get(elementBindings.inputs, `${slot}.static`) as string[]) ?? [];
        set(state.bindings, `${parentId}.inputs.${slot}.static`, [
            ...slotElements.slice(0, index),
            elementId,
            ...slotElements.slice(index)
        ]);
    });
}
