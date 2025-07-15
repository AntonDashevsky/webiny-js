import { useEffect } from "react";
import { useSelectFromDocument } from "~/BaseEditor/hooks/useSelectFromDocument";
import { useGetWebsiteBuilderSettings } from "~/features";
import { useDocumentEditor } from "~/DocumentEditor";

export const useEditorPreviewUrl = () => {
    const editor = useDocumentEditor();
    const { getSettings } = useGetWebsiteBuilderSettings();

    const { lastPreviewUrl, path } = useSelectFromDocument(document => {
        if (document.metadata.lastPreviewUrl) {
            return {
                lastPreviewUrl: document.metadata.lastPreviewUrl,
                path: document.properties.path
            };
        }

        return { lastPreviewUrl: undefined, path: document.properties.path };
    });

    useEffect(() => {
        getSettings().then(settings => {
            // In an odd case, when lastPreviewUrl is not set, ensure it is set.
            if (!lastPreviewUrl) {
                editor.updateDocument(document => {
                    document.metadata.lastPreviewUrl = `${settings.previewDomain}${path}`;
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

    return { previewUrl: lastPreviewUrl };
};
