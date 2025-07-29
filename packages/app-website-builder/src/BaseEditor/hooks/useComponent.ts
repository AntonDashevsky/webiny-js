import { useCallback } from "react";
import { useSelectFromEditor } from "~/BaseEditor/hooks/useSelectFromEditor";
import type { EditorState } from "~/editorSdk/Editor";

export const useComponent = (name: string) => {
    const selector = useCallback((state: EditorState) => state.components[name], [name]);

    return useSelectFromEditor(selector, [name]);
};
