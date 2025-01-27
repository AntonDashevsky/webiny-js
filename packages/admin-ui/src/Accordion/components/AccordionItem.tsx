import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { makeDecoratable, withStaticProps } from "~/utils";
import { AccordionTrigger } from "./AccordionTrigger";
import { AccordionContent } from "./AccordionContent";
import { AccordionItemIcon } from "./AccordionItemIcon";
import { AccordionItemAction } from "./AccordionItemAction";

interface AccordionItemProps
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
>(({ children, value, ...triggerProps }, ref) => {
    return (
        <AccordionPrimitive.Item value={value} ref={ref} className={"wby-border-b-sm wby-border-b-neutral-dimmed data-[state=open]:wby-rounded-bl-lg data-[state=open]:wby-rounded-br-lg "}>
            <AccordionTrigger {...triggerProps} />
            <AccordionContent>{children}</AccordionContent>
        </AccordionPrimitive.Item>
    );
});

AccordionItemBase.displayName = "AccordionItem";

const DecoratableAccordionItem = makeDecoratable("AccordionItem", AccordionItemBase);

const AccordionItem = withStaticProps(DecoratableAccordionItem, {
    Icon: AccordionItemIcon,
    Action: AccordionItemAction
});

export { AccordionItem, type AccordionItemProps };
