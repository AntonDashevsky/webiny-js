import React from "react";
import { type PbEditorElement } from "~/types.js";
import PeDocument from "./PeDocument.js";

import { type Element } from "@webiny/app-page-builder-elements/types.js";

interface DocumentProps {
    element: PbEditorElement;
}

const Document = (props: DocumentProps) => {
    const { element, ...rest } = props;
    return <PeDocument element={element as Element} {...rest} />;
};

export default Document;
