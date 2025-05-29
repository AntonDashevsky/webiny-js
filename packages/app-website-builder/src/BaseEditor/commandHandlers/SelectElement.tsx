import { useEffect } from "react";
import { useDocumentEditor } from "~/DocumentEditor";
import { Commands } from "../commands";
import { $selectElement } from "~/editorSdk/utils";

export const SelectElement = () => {
    const editor = useDocumentEditor();
    useEffect(() => {
        return editor.registerCommandHandler(Commands.SelectElement, ({ id }) => {
            $selectElement(editor, id);
        });
    }, []);

    return null;
};
