import React from "react";
import type { PbEditorElement } from "~/types";

import { PeGrid } from "./PeGrid";
import type { Element } from "@webiny/app-page-builder-elements/types";

interface GridProps {
    element: PbEditorElement;
}

const Grid = (props: GridProps) => {
    const { element, ...rest } = props;
    return <PeGrid element={element as Element} {...rest} />;
};

export default Grid;
