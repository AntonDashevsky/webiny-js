import React from "react";
import { type PbEditorElement } from "~/types.js";

import { PeGrid } from "./PeGrid.js";
import { type Element } from "@webiny/app-page-builder-elements/types.js";

interface GridProps {
    element: PbEditorElement;
}

const Grid = (props: GridProps) => {
    const { element, ...rest } = props;
    return <PeGrid element={element as Element} {...rest} />;
};

export default Grid;
