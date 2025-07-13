import React, { useEffect, useState } from "react";
import { useRouter } from "@webiny/react-router";
import { DocumentEditor } from "~/DocumentEditor/DocumentEditor.js";
import { useCreatePageRevisionFrom, useGetPage } from "~/features/pages";
import { OverlayLoader } from "@webiny/admin-ui";
import { useGetWebsiteBuilderSettings } from "~/features";
import { DefaultPageEditorConfig } from "./editor/DefaultPageEditorConfig";
import { DefaultEditorConfig } from "~/BaseEditor";
import { EDITOR_NAME } from "~/pages/constants";
import { PAGE_EDITOR_ROUTE, WbPageStatus } from "~/constants";
import type { Page } from "~/domains/Page";
import type { Page as EditorPage } from "~/sdk";

const getPageDataFromPage = (page: Page) => {
    return {
        id: page.id,
        status: page.status,
        properties: page.properties,
        state: {},
        bindings: page.bindings,
        elements: page.elements,
        metadata: page.metadata
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
        Promise.all([
            getSettings(),
            getPage({ id: params.id }).then(page => {
                if (page.status === WbPageStatus.Draft) {
                    setPage(getPageDataFromPage(page));

                    return;
                }

                return createPageRevisionFrom({ id: page.id }).then(page => {
                    history.push(
                        `${PAGE_EDITOR_ROUTE}/${page.id}?folderId=${page.location.folderId}`
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
        <DocumentEditor document={page} name={EDITOR_NAME}>
            <DefaultEditorConfig />
            <DefaultPageEditorConfig />
        </DocumentEditor>
    );
};
