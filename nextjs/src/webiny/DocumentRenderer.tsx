"use client";
import React from "react";
import dynamic from "next/dynamic";
import { customComponents } from "@/webiny/customComponents";
import { type Document } from "@webiny/website-builder-react";

// Server component with SSR enabled.
const DocumentRendererSSR = dynamic(
    // eslint-disable-next-line import/dynamic-import-chunkname
    () => import("@webiny/website-builder-react").then(m => ({ default: m.DocumentRenderer })),
    { ssr: true }
);

// Client component with SSR disabled.
const DocumentRendererNoSSR = dynamic(
    // eslint-disable-next-line import/dynamic-import-chunkname
    () => import("@webiny/website-builder-react").then(m => ({ default: m.DocumentRenderer })),
    { ssr: false }
);

interface DocumentRendererProps {
    document: Document | null;
    isEditing?: boolean;
}

export const DocumentRenderer = ({ document, isEditing }: DocumentRendererProps) => {
    if (!document) {
        return <h2>Page Not Found!</h2>;
    }

    return isEditing ? (
        <DocumentRendererNoSSR document={document} components={customComponents} />
    ) : (
        <DocumentRendererSSR document={document} components={customComponents} />
    );
};
