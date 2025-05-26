import React from "react";
import { observer } from "mobx-react-lite";
import { documentStore, environment } from "~/sdk/index.js";
import { PreviewElementRenderer } from "./PreviewElementRenderer/index.js";
import { LiveElementRenderer } from "./LiveElementRenderer";

interface ElementRendererProps {
    id: string;
}

export const ElementRenderer = observer((props: ElementRendererProps) => {
    const isPreview = environment.isPreview() && environment.isClient();
    const element = documentStore.getElement(props.id);

    if (!element) {
        return null;
    }

    if (isPreview) {
        return <PreviewElementRenderer element={element} />;
    } else {
        return <LiveElementRenderer element={element} />;
    }
});
