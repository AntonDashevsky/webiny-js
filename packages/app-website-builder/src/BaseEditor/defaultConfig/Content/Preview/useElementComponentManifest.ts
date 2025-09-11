import { useMemo } from "react";
import { useDocumentEditor } from "~/DocumentEditor/index.js";
import { $getComponentManifestByElementId } from "~/editorSdk/utils/index.js";

export const useElementComponentManifest = (elementId: string) => {
    const editor = useDocumentEditor();

    return useMemo(() => {
        return $getComponentManifestByElementId(editor, elementId ?? "");
    }, [elementId]);
};
