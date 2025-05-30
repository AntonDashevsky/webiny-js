"use client";
import React, { useMemo } from "react";
import { contentSdk, DocumentStoreProvider } from "~/react/index.js";
import type { Component, Document } from "~/sdk/types.js";
import { ElementRenderer } from "./ElementRenderer";

const rootId = "root";

interface DocumentRendererProps {
    document: Document;
    components: Component[];
}

export const DocumentRenderer = ({ document, components }: DocumentRendererProps) => {
    useMemo(() => {
        components.forEach(blueprint => contentSdk.registerComponent(blueprint));
    }, []);

    return (
        <div data-role={"document-renderer"}>
            <DocumentStoreProvider id={document.properties.id}>
                <ElementRenderer id={rootId} />
            </DocumentStoreProvider>
        </div>
    );
};
