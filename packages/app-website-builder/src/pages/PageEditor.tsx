import React, { useEffect, useState } from "react";
import { CompositionScope } from "@webiny/app-admin";
import { useRouter } from "@webiny/react-router";
import { DocumentEditor } from "~/DocumentEditor/DocumentEditor.js";
import type { Page } from "~/sdk";
import { useGetPage } from "~/features/pages";
import { OverlayLoader } from "@webiny/admin-ui";
import { useGetWebsiteBuilderSettings } from "~/features";
import { DefaultPageEditorConfig } from "./editor/DefaultPageEditorConfig";
import { DefaultEditorConfig } from "~/BaseEditor";

export const PageEditor = () => {
    const { getSettings } = useGetWebsiteBuilderSettings();
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState<Page | null>(null);

    const { params } = useRouter();
    const { getPage } = useGetPage();

    useEffect(() => {
        Promise.all([
            getSettings(),
            getPage({ id: params.id }).then(page => {
                setPage({
                    id: page.id,
                    status: page.status,
                    properties: page.properties,
                    state: {},
                    bindings: page.bindings,
                    elements: page.elements,
                    metadata: page.metadata
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
        <CompositionScope name={"WebsiteBuilder/PageEditor"} inherit={true}>
            <DocumentEditor document={page}>
                <DefaultEditorConfig />
                <DefaultPageEditorConfig />
            </DocumentEditor>
        </CompositionScope>
    );
};
