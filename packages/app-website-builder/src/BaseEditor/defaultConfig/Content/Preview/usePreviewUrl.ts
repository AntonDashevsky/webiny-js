import { useSelectFromDocument } from "~/BaseEditor/hooks/useSelectFromDocument";

export const usePreviewUrl = () => {
    // TODO: fetch from settings
    const previewDomain = "http://localhost:3000";

    const { previewUrl } = useSelectFromDocument(document => {
        if (document.metadata.lastPreviewUrl) {
            return { previewUrl: document.metadata.lastPreviewUrl };
        }

        return { previewUrl: `${previewDomain}${document.properties.path}` };
    });

    return { previewUrl };
};
