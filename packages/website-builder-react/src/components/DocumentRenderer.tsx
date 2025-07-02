"use client";
import React from "react";
import { type Component, contentSdk, type Document } from "@webiny/app-website-builder/sdk";
import { ElementRenderer } from "./ElementRenderer";
import { DocumentStoreProvider } from "./DocumentStoreProvider";

const rootId = "root";

interface DocumentRendererProps {
    document: Document;
    components: Component[];
}

export const DocumentRenderer = ({ document, components }: DocumentRendererProps) => {
    components.forEach(blueprint => contentSdk.registerComponent(blueprint));

    return (
        <div data-role={"document-renderer"}>
            <DocumentStoreProvider id={document.properties.id} document={document}>
                <ElementRenderer id={rootId} />
            </DocumentStoreProvider>
        </div>
    );
};
