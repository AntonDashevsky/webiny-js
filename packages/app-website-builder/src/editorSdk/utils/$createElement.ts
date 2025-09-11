import type { Editor } from "../Editor.js";
import type { CommandPayload } from "~/editorSdk/createCommand.js";
import type { Commands } from "~/BaseEditor/index.js";
import { ElementFactory } from "@webiny/website-builder-sdk";

export function $createElement(
    editor: Editor,
    payload: CommandPayload<typeof Commands.CreateElement>
) {
    const { componentName, index, parentId, slot, bindings } = payload;
    const componentsManifest = editor.getEditorState().read().components;

    const elementFactory = new ElementFactory(componentsManifest);
    const { operations } = elementFactory.createElementFromComponent({
        componentName,
        parentId,
        slot,
        index,
        bindings: bindings ?? componentsManifest[componentName].defaults ?? {}
    });

    editor.updateDocument(document => {
        operations.forEach(operation => operation.apply(document));
    });
}
