import { useEffect } from "react";
import { useDocumentEditor } from "~/DocumentEditor";
import { Commands } from "../commands";
import { $deselectElement } from "~/editorSdk/utils";

export const DeselectElement = () => {
    const editor = useDocumentEditor();
    useEffect(() => {
        return editor.registerCommandHandler(Commands.DeselectElement, () => {
            $deselectElement(editor);
        });
    }, []);

    return null;
};
