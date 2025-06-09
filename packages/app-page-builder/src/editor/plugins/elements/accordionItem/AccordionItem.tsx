import React from "react";
import { type PbEditorElement } from "~/types.js";

import PeAccordionItem from "./PeAccordionItem.js";
import { type Element } from "@webiny/app-page-builder-elements/types.js";

interface AccordionItemProps {
    element: PbEditorElement;
}

const AccordionItem = (props: AccordionItemProps) => {
    const { element, ...rest } = props;
    return <PeAccordionItem element={element as Element} {...rest} />;
};

export default AccordionItem;
