import { useEffect } from "react";
import { useDocumentEditor } from "~/DocumentEditor/index.js";
import { Commands } from "~/BaseEditor/index.js";
import { $deleteElement } from "~/editorSdk/utils/index.js";

export const DeleteElement = () => {
    const editor = useDocumentEditor();
    useEffect(() => {
        return editor.registerCommandHandler(Commands.DeleteElement, payload => {
            editor.updateDocument(document => {
                $deleteElement(document, payload.id);
            });
        });
    }, []);

    return null;
};
