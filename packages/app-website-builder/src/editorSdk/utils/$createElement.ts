import { generateAlphaNumericLowerCaseId } from "@webiny/utils/generateId";
import { Editor } from "../Editor";
import { CommandPayload } from "~/editorSdk/createCommand";
import { Commands } from "~/BaseEditor";
import get from "lodash/get";
import set from "lodash/set";

export function $createElement(
    editor: Editor,
    payload: CommandPayload<typeof Commands.CreateElement>
) {
    editor.updateDocument(state => {
        const id = generateAlphaNumericLowerCaseId(10);
        const { componentName, index, parentId, slot } = payload;

        const editorState = editor.getEditorState().read();

        // TODO: apply component defaults to new elements!
        const componentManifest = editorState.components[componentName];

        state.elements[id] = {
            id,
            type: "Webiny/Element",
            parent: { id: parentId, slot },
            component: {
                name: componentName,
                inputs: {}
            }
        };

        const parentElementComponent = state.elements[parentId].component;
        const slotElements = get(parentElementComponent.inputs, slot) ?? [];
        set(parentElementComponent.inputs, slot, [
            ...slotElements.slice(0, index),
            id,
            ...slotElements.slice(index)
        ]);
    });
}
