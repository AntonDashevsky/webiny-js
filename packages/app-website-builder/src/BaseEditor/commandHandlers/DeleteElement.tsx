import { useEffect } from "react";
import { useDocumentEditor } from "~/DocumentEditor";
import { Commands } from "~/BaseEditor";
import { $deleteElement } from "~/editorSdk/utils";

export const DeleteElement = () => {
    const editor = useDocumentEditor();
    useEffect(() => {
        return editor.registerCommandHandler(Commands.DeleteElement, payload => {
            $deleteElement(editor, payload.id);
        });
    }, []);

    return null;
};
