import React, { useEffect, useState } from "react";
import { CompositionScope } from "@webiny/app-admin";
import { useRouter } from "@webiny/react-router";
import { DocumentEditor } from "~/DocumentEditor/DocumentEditor.js";
import type { Page } from "~/sdk";
import { useGetPage } from "~/features/pages";
import { OverlayLoader } from "@webiny/admin-ui";
import { EditorConfig } from "~/BaseEditor";
import { AutoSaveIndicator, PageAutoSave } from "./PageAutoSave";

export const PageEditor = () => {
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState<Page | null>(null);

    const { params } = useRouter();
    const { getPage } = useGetPage();

    useEffect(() => {
        getPage({ id: params.id }).then(page => {
            setPage({
                id: page.id,
                status: page.status,
                properties: page.properties,
                state: {},
                bindings: page.bindings,
                elements: page.elements
            });
            setLoading(false);
        });
    }, [params.id]);

    if (loading || !page) {
        return <OverlayLoader text={"Loading page..."} />;
    }

    return (
        <CompositionScope name={"websiteBuilder"}>
            <DocumentEditor document={page}>
                <EditorConfig>
                    <PageAutoSave />
                    <EditorConfig.Ui.TopBar.Element
                        group={"left"}
                        name={"autoSave"}
                        after={"title"}
                        element={<AutoSaveIndicator />}
                    />
                </EditorConfig>
            </DocumentEditor>
        </CompositionScope>
    );
};
