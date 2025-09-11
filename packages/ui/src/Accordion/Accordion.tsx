import React from "react";
import { Accordion as AdminUiAccordion } from "@webiny/admin-ui";
import type { ListItem } from "../List/index.js";
import { type AccordionItem } from "./AccordionItem.js";

interface AccordionProps {
    /**
     * Element displayed when accordion is expanded.
     */
    children:
        | React.ReactElement<typeof ListItem>[]
        | React.ReactElement<typeof AccordionItem>
        | React.ReactElement<typeof AccordionItem>[];

    /**
     * Elevation number, default set to 2
     */
    elevation?: number;

    /**
     * Append a class name
     */
    className?: string;
}

/**
 * @deprecated This component is deprecated and will be removed in future releases.
 * Please use the `Accordion` component from the `@webiny/admin-ui` package instead.
 */
const Accordion = (props: AccordionProps) => {
    return <AdminUiAccordion>{props.children}</AdminUiAccordion>;
};

export { Accordion, type AccordionProps };
