import { useEffect } from "react";
import { useDocumentEditor } from "~/DocumentEditor";
import { Commands } from "~/BaseEditor";
import { $deleteElement } from "~/editorSdk/utils";

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
