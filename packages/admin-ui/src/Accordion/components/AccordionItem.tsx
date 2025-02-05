import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { cn, makeDecoratable, withStaticProps } from "~/utils";
import { AccordionTrigger } from "./AccordionTrigger";
import { AccordionContent } from "./AccordionContent";
import { AccordionItemIcon } from "./AccordionItemIcon";
import { AccordionItemAction } from "./AccordionItemAction";
import { AccordionItemHandle } from "./AccordionItemHandle";
import { useAccordion } from "~/Accordion";

interface AccordionItemProps
    extends Omit<React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>, "title"> {
    title: React.ReactNode;
    description?: React.ReactNode;
    icon?: React.ReactNode;
    handle?: React.ReactNode;
    actions?: React.ReactNode;
    children: React.ReactNode;
}

const AccordionItemBase = React.forwardRef<
    React.ElementRef<typeof AccordionPrimitive.Item>,
    AccordionItemProps
>((props, ref) => {
    const { variant, background } = useAccordion();

    const { itemProps, triggerProps, contentProps } = React.useMemo(() => {
        const {
            // Item props.
            value,

            // Content props.
            children,

            // Trigger props.
            ...triggerProps
        } = props;

        return {
            itemProps: {
                value
            },
            triggerProps,
            contentProps: { children, withIcon: !!props.icon, withHandle: !!props.handle }
        };
    }, [props]);

    console.log('bk', background)
    return (
        <AccordionPrimitive.Item
            {...itemProps}
            className={cn(
                "wby-border-b-sm wby-border-b-neutral-dimmed data-[state=open]:wby-rounded-bl-lg data-[state=open]:wby-rounded-br-lg",
                {
                    "wby-rounded-lg": variant === "container",
                    "wby-bg-neutral-base": background === "base",
                    "wby-bg-neutral-light": background === "light"
                }
            )}
            ref={ref}
        >
            <AccordionTrigger {...triggerProps} />
            <AccordionContent {...contentProps} />
        </AccordionPrimitive.Item>
    );
});

AccordionItemBase.displayName = "AccordionItem";

const DecoratableAccordionItem = makeDecoratable("AccordionItem", AccordionItemBase);

const AccordionItem = withStaticProps(DecoratableAccordionItem, {
    Icon: AccordionItemIcon,
    Action: AccordionItemAction,
    Handle: AccordionItemHandle
});

export { AccordionItem, type AccordionItemProps };
