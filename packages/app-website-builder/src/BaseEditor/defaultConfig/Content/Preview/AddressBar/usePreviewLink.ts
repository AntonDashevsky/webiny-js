import { useMemo } from "react";
import { useEditorPreviewUrl } from "~/BaseEditor/defaultConfig/Content/Preview/useEditorPreviewUrl";

export const usePreviewLink = () => {
    const { previewUrl } = useEditorPreviewUrl();

    return useMemo(() => {
        if(!previewUrl) {
            return "";
        }
        const url = new URL(previewUrl);
        url.searchParams.set("wb.preview", "true");
        return url.toString();
    }, [previewUrl]);
};
