import type { Editor } from "../Editor";

export function $getActiveElementId(editor: Editor) {
    return editor.getEditorState().read().selectedElement;
}
