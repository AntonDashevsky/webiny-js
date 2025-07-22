import { useEffect, useMemo } from "react";
import { useSelectFromDocument } from "~/BaseEditor/hooks/useSelectFromDocument";
import { useDocumentEditor } from "~/DocumentEditor";
import { usePreviewDomain } from "./usePreviewDomain";

export const useIframeUrl = () => {
    const editor = useDocumentEditor();
    const { previewDomain } = usePreviewDomain();

    const id = useSelectFromDocument(document => document.id);
    const documentType = useSelectFromDocument(document => document.metadata.documentType);
    const path = useSelectFromDocument(document => document.properties.path);
    const lastPreviewUrl = useSelectFromDocument(document => document.metadata.lastPreviewUrl);

    const iframeUrl = useMemo(() => {
        const url = new URL(lastPreviewUrl);
        addSearchParamsFromDocument(url, id, documentType);
        return url.toString();
    }, [lastPreviewUrl]);

    useEffect(() => {
        if (!previewDomain) {
            return;
        }

        // In an odd case, when lastPreviewUrl is not set, ensure it is set.
        if (!iframeUrl) {
            const url = new URL(`${previewDomain}${path}`);
            addSearchParamsFromDocument(url, id, documentType);
            editor.updateDocument(document => {
                document.metadata.lastPreviewUrl = url.toString();
            });
            return;
        }

        const newUrl = new URL(`${previewDomain}${path}`);
        addSearchParamsFromDocument(newUrl, id, documentType);

        editor.updateDocument(document => {
            document.metadata.lastPreviewUrl = newUrl.toString();
        });
    }, [previewDomain, iframeUrl, path]);

    return iframeUrl;
};

function addSearchParamsFromDocument(url: URL, id: string, documentType: string) {
    const searchParams = url.searchParams;
    searchParams.set("wb.editing", "true");
    searchParams.set("wb.type", documentType);
    searchParams.set("wb.id", id);
    searchParams.set("wb.path", url.pathname);
    searchParams.set("wb.referrer", window.location.origin);
}
