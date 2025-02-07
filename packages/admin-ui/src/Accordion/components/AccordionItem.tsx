import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { makeDecoratable, withStaticProps } from "~/utils";
import { AccordionTrigger } from "./AccordionTrigger";
import { AccordionContent } from "./AccordionContent";
import { AccordionItemIcon } from "./AccordionItemIcon";
import { AccordionItemAction } from "./AccordionItemAction";
import { AccordionItemHandle } from "./AccordionItemHandle";
import { useAccordion } from "~/Accordion";
import { cva } from "class-variance-authority";

interface AccordionItemProps
    extends Omit<React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>, "title"> {
    title: React.ReactNode;
    description?: React.ReactNode;
    icon?: React.ReactNode;
    handle?: React.ReactNode;
    actions?: React.ReactNode;
    children: React.ReactNode;
}

const accordionItemVariants = cva(
    "wby-border-b-sm wby-border-b-neutral-dimmed data-[state=open]:wby-rounded-bl-lg data-[state=open]:wby-rounded-br-lg",
    {
        variants: {
            variant: {
                underline: "",
                container: "wby-rounded-lg"
            },
            background: {
                base: "wby-bg-neutral-base",
                light: "wby-bg-neutral-light",
                transparent: ""
            }
        }
    }
);

const AccordionItemBase = (props: AccordionItemProps) => {
    const { variant, background } = useAccordion();

    const { itemProps, triggerProps, contentProps } = React.useMemo(() => {
        const {
            // Item props.
            value,
            className,

            // Content props.
            children,

            // Trigger props.
            ...triggerProps
        } = props;

        return {
            itemProps: {
                value,
                className
            },
            triggerProps,
            contentProps: { children, withIcon: !!props.icon, withHandle: !!props.handle }
        };
    }, [props]);

    return (
        <AccordionPrimitive.Item
            {...itemProps}
            className={accordionItemVariants({
                variant,
                background,
                className: itemProps.className
            })}
        >
            <AccordionTrigger {...triggerProps} />
            <AccordionContent {...contentProps} />
        </AccordionPrimitive.Item>
    );
};

const DecoratableAccordionItem = makeDecoratable("AccordionItem", AccordionItemBase);

const AccordionItem = withStaticProps(DecoratableAccordionItem, {
    Icon: AccordionItemIcon,
    Action: AccordionItemAction,
    Handle: AccordionItemHandle
});

export { AccordionItem, type AccordionItemProps };
