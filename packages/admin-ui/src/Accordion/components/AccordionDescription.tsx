import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-Accordion";
import { cn } from "~/utils";

export type AccordionDescriptionProps = React.ComponentPropsWithoutRef<
    typeof AccordionPrimitive.Description
>;

export const AccordionDescription = ({ className, ...props }: AccordionDescriptionProps) => (
    <AccordionPrimitive.Description
        {...props}
        className={cn("wby-text-sm wby-text-neutral-strong", className)}
    />
);
