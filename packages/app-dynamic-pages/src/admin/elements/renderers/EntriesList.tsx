import React from "react";
import { PbElement } from "@webiny/app-page-builder/types.js";
import { EmptyCell } from "@webiny/app-page-builder/editor/plugins/elements/cell/EmptyCell.js";
import { useElementWithChildren } from "@webiny/app-page-builder/editor/index.js";
import { EntriesListRenderer } from "~/dataInjection/renderers/EntriesList.js";

interface AdminEntriesListRendererProps {
    element: PbElement;
}

export const AdminEntriesListRenderer = ({ element, ...rest }: AdminEntriesListRendererProps) => {
    const elementWithChildren = useElementWithChildren(element.id);

    if (!elementWithChildren) {
        return null;
    }

    return (
        <EntriesListRenderer
            {...rest}
            element={elementWithChildren}
            ifEmpty={<EmptyCell element={elementWithChildren} />}
        />
    );
};

AdminEntriesListRenderer.displayName = "AdminEntriesListRenderer";
