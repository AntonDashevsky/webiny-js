import { Editor } from "../Editor";

export function $getElementById(editor: Editor, id: string) {
    return editor.getDocumentState().read().elements[id];
}
