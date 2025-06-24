import { useEffect } from "react";
import { useDocumentEditor } from "~/DocumentEditor";
import { Commands } from "~/BaseEditor";
import { $moveElement } from "~/editorSdk/utils";

export const MoveElement = () => {
    const editor = useDocumentEditor();
    useEffect(() => {
        return editor.registerCommandHandler(Commands.MoveElement, payload => {
            editor.updateDocument(document => {
                $moveElement(document, payload);
            });
        });
    }, []);

    return null;
};
