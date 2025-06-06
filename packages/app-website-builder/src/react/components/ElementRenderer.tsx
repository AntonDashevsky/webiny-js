"use client";
import React from "react";
import { observer } from "mobx-react-lite";
import { environment } from "~/sdk/index.js";
import { PreviewElementRenderer } from "./PreviewElementRenderer/index.js";
import { LiveElementRenderer } from "./LiveElementRenderer";
import { useDocumentStore } from "./DocumentStoreProvider.js";

interface ElementRendererProps {
    id: string;
}

export const ElementRenderer = observer((props: ElementRendererProps) => {
    const documentStore = useDocumentStore();
    const isPreview = environment.isPreview() && environment.isClient();
    const element = documentStore.getElement(props.id);

    if (!element) {
        return <div>Missing element component {props.id}</div>;
    }

    if (isPreview) {
        return <PreviewElementRenderer element={element} />;
    } else {
        return <LiveElementRenderer element={element} />;
    }
});
