import React, { useEffect, useState } from "react";
import { contentSdk, environment } from "../index.js";
import { DocumentRenderer } from "./DocumentRenderer.js";
import type { Component, Document } from "~/sdk/types.js";

export type Page = Document;

interface PageRendererProps {
    page: Page | null;
    components: Component[];
}

export function PageRenderer({ page, components }: PageRendererProps) {
    const [data, setData] = useState(page);

    const isPreview = environment.isPreview();

    useEffect(() => {
        if (isPreview) {
            // It doesn't matter what page we request, the SDK will return the data provided by the editor.
            contentSdk.getPage("*").then(previewData => {
                setData(previewData);
            });
        }
    }, []);

    if (isPreview && !data) {
        return <div>🔧 Waiting for preview data...</div>;
    }

    if (!data) {
        return <div data-role={"page-renderer.no-data"} />;
    }

    return <DocumentRenderer document={data} components={components} />;
}
