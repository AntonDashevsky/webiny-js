import React from "react";
import { MediumEditorOptions, PbEditorElement } from "~/types.js";
import PeList from "./PeList.js";

import { Element } from "@webiny/app-page-builder-elements/types.js";

interface ListProps {
    element: PbEditorElement;
    mediumEditorOptions?: MediumEditorOptions;
}

const List = (props: ListProps) => {
    const { element, ...rest } = props;
    return <PeList element={element as Element} {...rest} />;
};

export default React.memo(List);
