import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-Accordion";
import { cn } from "~/utils";

export interface AccordionContentProps
    extends React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content> {
    dismissible?: boolean;
}

const AccordionContent = React.forwardRef<
    React.ElementRef<typeof AccordionPrimitive.Content>,
    AccordionContentProps
>(({ className, dismissible, children, ...props }, ref) => {
    const dismissibleProps = React.useMemo<
        Pick<AccordionPrimitive.AccordionContentProps, "onInteractOutside" | "onEscapeKeyDown">
    >(() => {
        if (dismissible === false) {
            return {
                onInteractOutside: event => event.preventDefault(),
                onEscapeKeyDown: event => event.preventDefault()
            };
        }

        return {};
    }, [dismissible]);

    return (
        <AccordionPrimitive.Content
            {...dismissibleProps}
            {...props}
            ref={ref}
            className={cn(
                "wby-fixed wby-left-[50%] wby-top-[50%] wby-z-50 wby-grid wby-w-full wby-max-w-lg wby-border wby-bg-neutral-base wby-shadow-lg wby-focus-visible:outline-none wby-rounded-xl wby-text-md wby-text-neutral-strong",
                "wby-translate-x-[-50%] wby-translate-y-[-50%] wby-duration-200 data-[state=open]:wby-animate-in data-[state=closed]:wby-animate-out data-[state=closed]:wby-fade-out-0 data-[state=open]:wby-fade-in-0 data-[state=closed]:wby-zoom-out-95 data-[state=open]:wby-zoom-in-95 data-[state=closed]:wby-slide-out-to-left-1/2 data-[state=closed]:wby-slide-out-to-top-[48%] data-[state=open]:wby-slide-in-from-left-1/2 data-[state=open]:wby-slide-in-from-top-[48%]",
                className
            )}
        >
            {/* We needed to add this wrapper so that absolute-positioned elements can be placed */}
            {/* inside the Accordion. We noticed this while showing a loader inside the Accordion. */}
            <div className={"wby-flex wby-flex-col"}>{children}</div>
        </AccordionPrimitive.Content>
    );
});

AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { AccordionContent };
