import { useEffect, useState } from "react";
import { PageDto } from "~/domain/Page";
import { useGetWebsiteBuilderSettings } from "~/features";

export const usePagePreviewLink = (pageDto: PageDto) => {
    const [previewLink, setPreviewLink] = useState<string | null>(null);
    const { getSettings } = useGetWebsiteBuilderSettings();

    useEffect(() => {
        getSettings().then(settings => {
            const url = new URL(`${settings.previewDomain}${pageDto.properties.path}`);
            url.searchParams.set("wb.preview", "true");
            url.searchParams.set("wb.type", pageDto.metadata.documentType);
            url.searchParams.set("wb.id", pageDto.id);
            url.searchParams.set("wb.path", pageDto.properties.path);
            setPreviewLink(url.toString());
        });
    }, []);

    return previewLink;
};
