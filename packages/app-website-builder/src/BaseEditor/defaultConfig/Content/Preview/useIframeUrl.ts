import { useMemo } from "react";
import { useSelectFromDocument } from "~/BaseEditor/hooks/useSelectFromDocument";
import { usePreviewDomain } from "./usePreviewDomain";

export const useIframeUrl = () => {
    const { previewDomain } = usePreviewDomain();

    const id = useSelectFromDocument(document => document.id);
    const documentType = useSelectFromDocument(document => document.metadata.documentType);
    const path = useSelectFromDocument(document => document.properties.path);

    return useMemo(() => {
        if (!previewDomain) {
            return null;
        }
        const newUrl = new URL(`${previewDomain}${path}`);
        addSearchParamsFromDocument(newUrl, id, documentType);
        return newUrl.toString();
    }, [previewDomain, id, path, documentType]);
};

function addSearchParamsFromDocument(url: URL, id: string, documentType: string) {
    const searchParams = url.searchParams;
    searchParams.set("wb.editing", "true");
    searchParams.set("wb.type", documentType);
    searchParams.set("wb.id", id);
    searchParams.set("wb.path", url.pathname);
    searchParams.set("wb.referrer", window.location.origin);
}
