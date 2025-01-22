import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-Accordion";
import { cn } from "~/utils";

export const AccordionOverlay = React.forwardRef<
    React.ElementRef<typeof AccordionPrimitive.Overlay>,
    React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Overlay>
>(({ className, ...props }, ref) => (
    <AccordionPrimitive.Overlay
        ref={ref}
        className={cn(
            "wby-fixed wby-inset-0 wby-z-50 wby-bg-neutral-dark/50 wby-data-[state=open]:animate-in wby-data-[state=closed]:animate-out wby-data-[state=closed]:fade-out-0 wby-data-[state=open]:fade-in-0",
            className
        )}
        {...props}
    />
));

AccordionOverlay.displayName = AccordionPrimitive.Overlay.displayName;
