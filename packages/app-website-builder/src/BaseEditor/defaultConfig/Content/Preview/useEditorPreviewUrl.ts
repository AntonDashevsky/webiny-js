import { useEffect } from "react";
import { useSelectFromDocument } from "~/BaseEditor/hooks/useSelectFromDocument";
import { useGetWebsiteBuilderSettings } from "~/features";
import { useDocumentEditor } from "~/DocumentEditor";
import { EditorDocument } from "~/sdk";

export const useEditorPreviewUrl = () => {
    const editor = useDocumentEditor();
    const { getSettings } = useGetWebsiteBuilderSettings();

    const { lastPreviewUrl, path } = useSelectFromDocument(
        document => {
            let lastPreviewUrl = document.metadata.lastPreviewUrl;

            if (lastPreviewUrl) {
                const url = new URL(lastPreviewUrl);
                addSearchParamsFromDocument(url, document);
                lastPreviewUrl = url.toString();
            }

            return {
                lastPreviewUrl,
                path: document.properties.path
            };
        },
        [editor.getDocumentState().read()]
    );

    useEffect(() => {
        getSettings().then(settings => {
            // In an odd case, when lastPreviewUrl is not set, ensure it is set.
            if (!lastPreviewUrl) {
                editor.updateDocument(document => {
                    const url = new URL(`${settings.previewDomain}${path}`);
                    addSearchParamsFromDocument(url, document);
                    document.metadata.lastPreviewUrl = url.toString();
                });
                return;
            }

            // Ensure lastPreviewUrl uses the up-to-date preview domain.
            if (!lastPreviewUrl.startsWith(settings.previewDomain)) {
                const url = new URL(lastPreviewUrl);
                const newUrl = new URL(`${settings.previewDomain}${path}`);
                url.searchParams.forEach((value, key) => {
                    newUrl.searchParams.set(key, value);
                });
                editor.updateDocument(document => {
                    document.metadata.lastPreviewUrl = newUrl.toString();
                });
            }
        });
    }, [lastPreviewUrl, path]);

    const setPreviewUrl = (urlString: string) => {
        editor.updateDocument(document => {
            const url = new URL(urlString);
            addSearchParamsFromDocument(url, document);
            document.metadata.lastPreviewUrl = url.toString();
        });
    };

    return { previewUrl: lastPreviewUrl, setPreviewUrl };
};

function addSearchParamsFromDocument(url: URL, document: EditorDocument) {
    const searchParams = url.searchParams;
    searchParams.set("wb.editing", "true");
    searchParams.set("wb.type", document.metadata.documentType);
    searchParams.set("wb.id", document.id);
    searchParams.set("wb.path", url.pathname);
    searchParams.set("wb.referrer", window.location.origin);
}
