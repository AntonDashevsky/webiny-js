import type { SerializedEditorState } from "lexical";
import type { LexicalValue } from "~/types";

export const parseLexicalState = (
    editorStateValue: LexicalValue | null
): false | SerializedEditorState => {
    if (!editorStateValue) {
        return false;
    }
    try {
        const maybeValidState = JSON.parse(editorStateValue);
        return maybeValidState["root"] ? maybeValidState : false;
    } catch {
        return false;
    }
};

export const isValidLexicalData = (
    editorStateValue: LexicalValue | null
): editorStateValue is LexicalValue => {
    if (!editorStateValue) {
        return false;
    }

    try {
        const data = JSON.parse(editorStateValue);
        return !!data["root"];
    } catch {
        return false;
    }
};
