import * as React from "react";
import { cn } from "~/utils";
import type { AccordionProps } from "~/Accordion";

export type AccordionBodyProps = Pick<AccordionProps, "children" | "bodyPadding">;

export const AccordionBody = ({ bodyPadding, children }: AccordionBodyProps) => {
    return (
        <div className={cn("wby-py-sm ", { "wby-px-lg": bodyPadding !== false })}>{children}</div>
    );
};
