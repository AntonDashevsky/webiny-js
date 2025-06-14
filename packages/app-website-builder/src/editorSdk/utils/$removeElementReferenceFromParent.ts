import get from "lodash/get";
import { Editor } from "../Editor";
import set from "lodash/set";
import { toJS } from "mobx";

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
        const elementBindings = state.bindings[parentId];
        const slotElements = (get(elementBindings.inputs, `${slot}.static`) as string[]) ?? [];

        console.log("slotElements", toJS(slotElements));
        console.log("newValue", toJS(slotElements.filter(id => id !== elementId)));
        set(
            state.bindings,
            `${parentId}.inputs.${slot}.static`,
            slotElements.filter(id => id !== elementId)
        );
    });
}
