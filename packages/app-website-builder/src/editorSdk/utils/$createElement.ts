import type { Editor } from "../Editor";
import type { CommandPayload } from "~/editorSdk/createCommand";
import { Commands } from "~/BaseEditor";
import { ElementFactory } from "~/sdk/ElementFactory";
import { $applyDocumentOperations } from "~/editorSdk/utils/$applyDocumentOperations";

export function $createElement(
    editor: Editor,
    payload: CommandPayload<typeof Commands.CreateElement>
) {
    const { componentName, index, parentId, slot } = payload;
    const componentsManifest = editor.getEditorState().read().components;

    const elementFactory = new ElementFactory(componentsManifest);
    const operations = elementFactory.generateOperations({
        componentName,
        parentId,
        slot,
        index,
        defaults: componentsManifest[componentName].defaults
    });

    $applyDocumentOperations(editor, operations);
}
