import { autorun } from "mobx";
import { useCallback, useEffect, useState } from "react";
import { useDocumentEditor } from "~/DocumentEditor";
import { DocumentElement } from "~/sdk/types";
import { Commands } from "../commands";

export const useActiveElement = () => {
    const [activeElement, setActiveElement] = useState<DocumentElement | null>(null);
    const editor = useDocumentEditor();

    useEffect(() => {
        return autorun(() => {
            const editorState = editor.getEditorState().read();
            const documentState = editor.getDocumentState().read();

            const activeElementId = editorState.selectedElement;

            if (activeElementId) {
                setActiveElement(documentState.elements[activeElementId]);
            } else {
                setActiveElement(null);
            }
        });
    }, []);

    const setActiveElementId = useCallback(
        (id: string | null) => {
            editor.executeCommand(Commands.SelectElement, { id });
        },
        [editor]
    );

    return [activeElement, setActiveElementId] as const;
};
