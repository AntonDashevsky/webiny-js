import React, { useEffect, useState } from "react";
import { useRouter } from "@webiny/react-router";
import { DocumentEditor } from "~/DocumentEditor/DocumentEditor.js";
import { useCreatePageRevisionFrom, useGetPage } from "~/features/pages/index.js";
import { OverlayLoader } from "@webiny/admin-ui";
import { useGetWebsiteBuilderSettings } from "~/features/index.js";
import { DefaultPageEditorConfig } from "./PageEditor/DefaultPageEditorConfig.js";
import { DefaultEditorConfig } from "~/BaseEditor/index.js";
import { EDITOR_NAME } from "~/modules/pages/constants.js";
import { WB_PAGE_EDITOR_ROUTE, WbPageStatus } from "~/constants.js";
import type { EditorPage } from "@webiny/website-builder-sdk";
import type { Page } from "~/domain/Page/index.js";

const getPageDataFromPage = (page: Page): EditorPage => {
    return {
        id: page.id,
        version: page.version,
        status: page.status,
        location: page.location,
        properties: page.properties as EditorPage["properties"],
        bindings: page.bindings,
        elements: page.elements,
        metadata: page.metadata,
        state: {}
    };
};

export const PageEditor = () => {
    const { getSettings } = useGetWebsiteBuilderSettings();
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState<EditorPage | null>(null);

    const { history, params } = useRouter();
    const { getPage } = useGetPage();
    const { createPageRevisionFrom } = useCreatePageRevisionFrom();

    useEffect(() => {
        setLoading(true);
        Promise.all([
            getSettings(),
            getPage({ id: params.id }).then(page => {
                if (page.status === WbPageStatus.Draft) {
                    setPage(getPageDataFromPage(page));

                    return;
                }

                return createPageRevisionFrom({ id: page.id }).then(page => {
                    const encodedPageId = encodeURIComponent(page.id);
                    const encodedFolderId = encodeURIComponent(page.location.folderId);
                    history.push(
                        `${WB_PAGE_EDITOR_ROUTE}/${encodedPageId}?folderId=${encodedFolderId}`
                    );
                });
            })
        ]).then(() => {
            setLoading(false);
        });
    }, [params.id]);

    if (loading || !page) {
        return <OverlayLoader text={"Loading page..."} />;
    }

    return (
        <DocumentEditor<EditorPage> key={page.id} document={page} name={EDITOR_NAME}>
            <DefaultEditorConfig />
            <DefaultPageEditorConfig />
        </DocumentEditor>
    );
};
