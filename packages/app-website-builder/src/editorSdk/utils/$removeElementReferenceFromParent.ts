import { Editor } from "../Editor";

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
        const bindings = state.bindings[parentId] ?? {};
        const inputs = bindings.inputs ?? {};

        const binding = inputs[slot];
        if (!binding) {
            return;
        }

        if (binding.list) {
            inputs[slot].static = (binding.static as string[]).filter(id => id !== elementId);
        } else {
            delete inputs[slot].static;
        }

        state.bindings[parentId] = {
            ...bindings,
            inputs
        };
    });
}
