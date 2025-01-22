import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-Accordion";
import { cn } from "~/utils";

export type AccordionTitleProps = React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Title>;

export const AccordionTitle = ({ className, ...props }: AccordionTitleProps) => (
    <AccordionPrimitive.Title
        {...props}
        className={cn("wby-text-h4 wby-flex wby-gap-sm", className)}
    />
);
