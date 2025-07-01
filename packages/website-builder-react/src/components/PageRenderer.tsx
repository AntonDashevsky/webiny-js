"use client";
import React from "react";
import { DocumentRenderer } from "./DocumentRenderer.js";
import type { Component, Document } from "@webiny/app-website-builder/sdk";

export type Page = Document;

interface PageRendererProps {
    page: Page | null;
    components: Component[];
}

export function PageRenderer({ page, components }: PageRendererProps) {
    if (!page) {
        return <div data-role={"page-renderer.no-data"} />;
    }

    return <DocumentRenderer document={page} components={components} />;
}
