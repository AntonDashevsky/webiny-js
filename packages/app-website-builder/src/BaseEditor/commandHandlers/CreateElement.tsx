import { useEffect } from "react";
import { useDocumentEditor } from "~/DocumentEditor/index.js";
import { Commands } from "~/BaseEditor/index.js";
import { $createElement } from "~/editorSdk/utils/index.js";

export const CreateElement = () => {
    const editor = useDocumentEditor();

    useEffect(() => {
        return editor.registerCommandHandler(Commands.CreateElement, payload => {
            $createElement(editor, payload);
        });
    }, []);

    return null;
};
