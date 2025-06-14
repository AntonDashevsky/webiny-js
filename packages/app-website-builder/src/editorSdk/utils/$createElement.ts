import { Editor } from "../Editor";
import { CommandPayload } from "~/editorSdk/createCommand";
import { Commands } from "~/BaseEditor";
import { ElementFactory } from "~/sdk/ElementFactory";

export function $createElement(
    editor: Editor,
    payload: CommandPayload<typeof Commands.CreateElement>
) {
    const { componentName, index, parentId, slot } = payload;

    const elementFactory = new ElementFactory(editor);
    elementFactory.createElement(componentName, parentId, slot, index);
}
