import * as React from "react";
import { type AccordionProps } from "../Accordion";

const AccordionContext = React.createContext<Pick<AccordionProps, "variant" | "background">>({});

const useAccordion = () => {
    const context = React.useContext(AccordionContext);
    if (!context) {
        throw new Error(
            "Accordion compound components cannot be rendered outside the Accordion component"
        );
    }
    return context;
};

export { AccordionContext, useAccordion };
