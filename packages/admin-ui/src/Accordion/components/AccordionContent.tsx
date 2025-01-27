import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { makeDecoratable } from "~/utils";

const AccordionContentBase = React.forwardRef<
    React.ElementRef<typeof AccordionPrimitive.Content>,
    React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ children, ...props }, ref) => (
    <AccordionPrimitive.Content
        ref={ref}
        data-role={"content"}
        className="wby-overflow-hidden wby-text-md wby-pt-sm wby-pb-lg wby-pl-md-extra wby-pr-[52px] wby-transition-all data-[state=closed]:wby-animate-accordion-up data-[state=open]:wby-animate-accordion-down"
        {...props}
    >
        {children}
    </AccordionPrimitive.Content>
));

AccordionContentBase.displayName = AccordionPrimitive.Content.displayName;

export const AccordionContent = makeDecoratable("AccordionContent", AccordionContentBase);
