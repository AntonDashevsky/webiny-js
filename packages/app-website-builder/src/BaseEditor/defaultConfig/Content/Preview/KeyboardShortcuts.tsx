import { useCallback, useEffect } from "react";
import { useDocumentEditor } from "~/DocumentEditor";
import { useKeyHandler } from "~/BaseEditor/hooks/useKeyHandler";
import { $getActiveElementId } from "~/editorSdk/utils";
import { Commands } from "~/BaseEditor";

export const KeyboardShortcuts = () => {
    const editor = useDocumentEditor();
    const { addKeyHandler, removeKeyHandler } = useKeyHandler();

    const deleteActiveElement = useCallback(() => {
        const activeElementId = $getActiveElementId(editor);
        if (activeElementId) {
            editor.executeCommand(Commands.DeleteElement, { id: activeElementId });
        }
    }, []);

    useEffect(() => {
        addKeyHandler("Backspace", e => {
            e.preventDefault();
            deleteActiveElement();
        });

        addKeyHandler("Delete", e => {
            e.preventDefault();
            deleteActiveElement();
        });

        addKeyHandler("mod+z", e => {
            e.preventDefault();
            editor.undo();
        });
        addKeyHandler("mod+shift+z", e => {
            e.preventDefault();
            editor.redo();
        });

        return () => {
            removeKeyHandler("Backspace");
            removeKeyHandler("Delete");
            removeKeyHandler("mod+z");
            removeKeyHandler("mod+shift+z");
        };
    }, []);

    return null;
};
