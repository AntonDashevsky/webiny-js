import { useMemo } from "react";
import { useDocumentEditor } from "~/DocumentEditor";
import { $getComponentManifestByElementId } from "~/editorSdk/utils";

export const useElementComponentManifest = (elementId: string) => {
    const editor = useDocumentEditor();

    return useMemo(() => {
        return $getComponentManifestByElementId(editor, elementId);
    }, [elementId]);
};
