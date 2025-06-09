import React from "react";
import { type PbEditorElement } from "~/types.js";
import { PePagesList } from "./PePagesList.js";

import { type Element } from "@webiny/app-page-builder-elements/types.js";

interface PagesListProps {
    element: PbEditorElement;
}

export const PagesList = (props: PagesListProps) => {
    const { element, ...rest } = props;
    return <PePagesList element={element as Element} {...rest} />;
};
