import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ReactComponent as ChevronDown } from "@material-design-icons/svg/outlined/chevron_left.svg";

import { cn, makeDecoratable, withStaticProps } from "~/utils";

const AccordionRoot = AccordionPrimitive.Root;

const AccordionTriggerBase = React.forwardRef<
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
AccordionTriggerBase.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionTrigger = makeDecoratable("AccordionTrigger", AccordionTriggerBase);

const AccordionContentBase = React.forwardRef<
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

AccordionContentBase.displayName = AccordionPrimitive.Content.displayName;

const AccordionContent = makeDecoratable("AccordionContent", AccordionContentBase);

export interface AccordionItemProps
    extends Omit<React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>, "title"> {
    title: React.ReactNode;
    description?: React.ReactNode;
    icon?: React.ReactNode;
    actions?: React.ReactNode;
    children: React.ReactNode;
}

const AccordionItemBase = React.forwardRef<
    React.ElementRef<typeof AccordionPrimitive.Item>,
    AccordionItemProps
>(({ className, title, ...props }, ref) => {
    return (
        <AccordionPrimitive.Item ref={ref} className={cn("border-b", className)} {...props}>
            <AccordionTrigger>{title}</AccordionTrigger>
            <AccordionContent>
                Yes. It comes with default styles that matches the other components&apos; aesthetic.
            </AccordionContent>
        </AccordionPrimitive.Item>
    );
});

AccordionItemBase.displayName = "AccordionItem";

const AccordionItem = makeDecoratable("AccordionItem", AccordionItemBase);

const AccordionBase = AccordionRoot;

export const Accordion = withStaticProps(AccordionBase, {
    Item: AccordionItem
});

