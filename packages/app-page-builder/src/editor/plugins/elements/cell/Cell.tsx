import React from "react";
import { PbEditorElement } from "~/types.js";

import PeCell from "~/editor/plugins/elements/cell/PeCell.js";
import { Element } from "@webiny/app-page-builder-elements/types.js";

interface CellProps {
    element: PbEditorElement;
    isActive: boolean;
}

const Cell = (props: CellProps) => {
    const { element, ...rest } = props;
    return <PeCell element={element as Element} {...rest} />;
};

export default Cell;
