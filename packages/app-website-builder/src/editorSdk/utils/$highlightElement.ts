import { Editor } from "../Editor";

export function $highlightElement(editor: Editor, id: string | null) {
    editor.updateEditor(state => {
        state.highlightedElement = id;
    });
}
