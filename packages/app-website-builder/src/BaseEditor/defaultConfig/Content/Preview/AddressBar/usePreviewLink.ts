import { useMemo } from "react";
import { useEditorPreviewUrl } from "~/BaseEditor/defaultConfig/Content/Preview/useEditorPreviewUrl";
import { useSelectFromDocument } from "~/BaseEditor/hooks/useSelectFromDocument";

export const usePreviewLink = () => {
    const { previewUrl } = useEditorPreviewUrl();
    const { id, path, documentType } = useSelectFromDocument(document => {
        return {
            id: document.id,
            path: document.properties.path,
            documentType: document.metadata.documentType
        };
    });

    return useMemo(() => {
        if (!previewUrl) {
            return "";
        }
        const url = new URL(previewUrl);
        url.searchParams.set("wb.preview", "true");
        url.searchParams.set("wb.type", documentType);
        url.searchParams.set("wb.id", String(id));
        url.searchParams.set("wb.path", path);
        return url.toString();
    }, [previewUrl]);
};
