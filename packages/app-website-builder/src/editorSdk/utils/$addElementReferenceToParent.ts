import { InputValueBinding } from "~/sdk/types";
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
        const bindings = state.bindings[parentId] ?? {};
        const inputs = bindings.inputs ?? {};

        if (index < 0) {
            // Single value slot
            inputs[slot] = {
                type: "slot",
                dataType: "string",
                static: elementId
            };
        } else {
            const slotElements = inputs[slot] as InputValueBinding;
            inputs[slot] = {
                type: "slot",
                dataType: "string",
                list: true,
                static: [
                    ...(slotElements?.static ?? []).slice(0, index),
                    elementId,
                    ...(slotElements?.static ?? []).slice(index)
                ]
            };
        }

        state.bindings[parentId] = {
            ...bindings,
            inputs
        };
    });
}
