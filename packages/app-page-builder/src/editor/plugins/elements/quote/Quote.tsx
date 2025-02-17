import React from "react";
import { MediumEditorOptions, PbEditorElement } from "~/types.js";
import PeQuote from "./PeQuote.js";

import { Element } from "@webiny/app-page-builder-elements/types.js";

interface QuoteProps {
    element: PbEditorElement;
    mediumEditorOptions?: MediumEditorOptions;
}

const Quote = (props: QuoteProps) => {
    const { element, ...rest } = props;
    return <PeQuote element={element as Element} {...rest} />;
};

export default React.memo(Quote);
