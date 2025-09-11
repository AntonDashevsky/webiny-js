import React from "react";
import type { PbEditorElement } from "~/types";
import { PePagesList } from "./PePagesList";

import type { Element } from "@webiny/app-page-builder-elements/types";

interface PagesListProps {
    element: PbEditorElement;
}

export const PagesList = (props: PagesListProps) => {
    const { element, ...rest } = props;
    return <PePagesList element={element as Element} {...rest} />;
};
