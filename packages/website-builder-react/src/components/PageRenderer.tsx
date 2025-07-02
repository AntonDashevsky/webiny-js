"use client";
import React from "react";
import type { Component, Document } from "@webiny/app-website-builder/sdk";
import { DocumentRenderer } from "./DocumentRenderer.js";

export type Page = Document;

interface PageRendererProps {
    page: Page | null;
    components: Component[];
}

export const PageRenderer = ({ page, components }: PageRendererProps) => {
    if (!page) {
        return <div data-role={"page-renderer.no-data"} />;
    }

    return <DocumentRenderer document={page} components={components} />;
};
