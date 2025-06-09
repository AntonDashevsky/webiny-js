import React from "react";
import { type PbEditorElement } from "~/types.js";

import PeAccordion from "./PeAccordion.js";
import { type Element } from "@webiny/app-page-builder-elements/types.js";

interface AccordionProps {
    element: PbEditorElement;
}

const Accordion = (props: AccordionProps) => {
    const { element, ...rest } = props;
    return <PeAccordion element={element as Element} {...rest} />;
};

export default Accordion;
