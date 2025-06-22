import { useEffect } from "react";
import { useDocumentEditor } from "~/DocumentEditor";
import { Commands } from "../commands";
import { $highlightElement } from "~/editorSdk/utils";

export const HighlightElement = () => {
    const editor = useDocumentEditor();
    useEffect(() => {
        return editor.registerCommandHandler(Commands.HighlightElement, ({ id }) => {
            $highlightElement(editor, id);
        });
    }, []);

    return null;
};
