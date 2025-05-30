"use client";
import React, { useMemo } from "react";
import { contentSdk } from "~/react/index.js";
import { documentStore } from "~/sdk/DocumentStore.js";
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

    useMemo(() => {
        documentStore.setDocument(document);
    }, [document]);

    return (
        <div data-role={"document-renderer"}>
            <ElementRenderer id={rootId} />
        </div>
    );
};
