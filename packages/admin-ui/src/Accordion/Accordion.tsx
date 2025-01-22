import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ReactComponent as ChevronDown } from "@material-design-icons/svg/outlined/chevron_left.svg";

import { cn } from "~/utils";

const Accordion = AccordionPrimitive.Root;

const AccordionItem = React.forwardRef<
    React.ElementRef<typeof AccordionPrimitive.Item>,
    React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
    <AccordionPrimitive.Item ref={ref} className={cn("border-b", className)} {...props} />
));
AccordionItem.displayName = "AccordionItem";

const AccordionTrigger = React.forwardRef<
    React.ElementRef<typeof AccordionPrimitive.Trigger>,
    React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
    <AccordionPrimitive.Header className="flex">
        <AccordionPrimitive.Trigger
            ref={ref}
            className={cn(
                "flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180",
                className
            )}
            {...props}
        >
            {children}
            <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
        </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent = React.forwardRef<
    React.ElementRef<typeof AccordionPrimitive.Content>,
    React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
    <AccordionPrimitive.Content
        ref={ref}
        className="overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
        {...props}
    >
        <div className={cn("pb-4 pt-0", className)}>{children}</div>
    </AccordionPrimitive.Content>
));

AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };


// import {
//     Accordion,
//     AccordionContent,
//     AccordionItem,
//     AccordionTrigger,
// } from "@/components/ui/accordion"
//
// export function AccordionDemo() {
//     return (
//         <Accordion type="single" collapsible className="w-full">
//             <AccordionItem value="item-1">
//                 <AccordionTrigger>Is it accessible?</AccordionTrigger>
//                 <AccordionContent>
//                     Yes. It adheres to the WAI-ARIA design pattern.
//                 </AccordionContent>
//             </AccordionItem>
//             <AccordionItem value="item-2">
//                 <AccordionTrigger>Is it styled?</AccordionTrigger>
//                 <AccordionContent>
//                     Yes. It comes with default styles that matches the other
//                     components&apos; aesthetic.
//                 </AccordionContent>
//             </AccordionItem>
//             <AccordionItem value="item-3">
//                 <AccordionTrigger>Is it animated?</AccordionTrigger>
//                 <AccordionContent>
//                     Yes. It&apos;s animated by default, but you can disable it if you
//                     prefer.
//                 </AccordionContent>
//             </AccordionItem>
//         </Accordion>
//     )
// }
