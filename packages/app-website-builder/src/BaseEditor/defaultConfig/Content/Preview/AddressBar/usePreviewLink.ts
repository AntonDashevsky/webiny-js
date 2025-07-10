import { useMemo } from "react";
import { usePreviewUrl } from "~/BaseEditor/defaultConfig/Content/Preview/usePreviewUrl";

export const usePreviewLink = () => {
    const { previewUrl } = usePreviewUrl();

    return useMemo(() => {
        const url = new URL(previewUrl);
        url.searchParams.set("wb.preview", "true");
        return url.toString();
    }, [previewUrl]);
};
