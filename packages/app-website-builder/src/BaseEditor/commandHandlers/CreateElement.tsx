import { useEffect } from "react";
import { useDocumentEditor } from "~/DocumentEditor";
import { Commands } from "~/BaseEditor";
import { $createElement } from "~/editorSdk/utils";

export const CreateElement = () => {
    const editor = useDocumentEditor();

    useEffect(() => {
        return editor.registerCommandHandler(Commands.CreateElement, payload => {
            $createElement(editor, payload);
        });
    }, []);

    return null;
};
