import { useEffect } from "react";
import { useWebsiteBuilderTheme } from "~/BaseEditor/components";
import { usePreviewDomain } from "~/BaseEditor/defaultConfig/Content/Preview/usePreviewDomain";

export const LoadThemeStylesheet = () => {
    const { theme } = useWebsiteBuilderTheme();
    const { previewDomain } = usePreviewDomain();

    useEffect(() => {
        if (theme && theme.themeUrl) {
            const url = theme.themeUrl.startsWith("/")
                ? `${previewDomain}${theme.themeUrl}`
                : theme.themeUrl;

            // Remove existing stylesheet with the same href
            const existing = document.querySelector(`link[rel="stylesheet"][href="${url}"]`);
            if (existing) {
                existing.remove();
            }

            // Create a new link element
            const link = document.createElement("link");
            link.rel = "stylesheet";
            link.href = url;

            document.head.appendChild(link);
        }
    }, [theme]);

    return null;
};
