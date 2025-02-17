import React from "react";
import { useActiveElement, useIsElementChildOfType } from "@webiny/app-page-builder/editor/index.js";

interface HideIfChildOfEntriesListProps {
    children: React.ReactNode;
}

export const HideIfChildOfEntriesList = ({ children }: HideIfChildOfEntriesListProps) => {
    const [element] = useActiveElement();
    const { isChildOfType } = useIsElementChildOfType(element, "entries-list");

    if (!element) {
        return null;
    }

    return isChildOfType ? null : <>{children}</>;
};
