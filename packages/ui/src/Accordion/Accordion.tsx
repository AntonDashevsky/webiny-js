import React from "react";
import { Accordion as AdminUiAccordion } from "@webiny/admin-ui";
import {  ListItem } from "../List";
import { type AccordionItem } from "./AccordionItem";

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

const Accordion = (props: AccordionProps) => {
    return <AdminUiAccordion type={"single"}>{props.children}</AdminUiAccordion>
    // const { children, elevation = 2, className, ...other } = props;
    // return (
    //     <Elevation z={elevation} className={classNames("webiny-ui-accordion", className)}>
    //         <List twoLine className={listStyle} {...other}>
    //             {children}
    //         </List>
    //     </Elevation>
    // );
};

export { Accordion, type AccordionProps };
