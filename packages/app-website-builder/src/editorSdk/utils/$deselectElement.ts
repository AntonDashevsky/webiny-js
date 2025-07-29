import type { Editor } from "../Editor";

export function $deselectElement(editor: Editor) {
    editor.updateEditor(state => {
        state.selectedElement = null;
    });
}
