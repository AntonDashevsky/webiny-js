import React, { useMemo } from "react";
import { cn, makeDecoratable, withStaticProps } from "~/utils";
import { AccordionRoot } from "./components/AccordionRoot";
import { AccordionContext, useAccordion } from "./components/AccordionContext";
import { AccordionItem, type AccordionItemProps } from "./components/AccordionItem";

type AccordionProps = React.ComponentPropsWithoutRef<typeof AccordionRoot> & {
    children: React.ReactNode;
    variant?: "underline" | "container";
    background?: "transparent" | "base" | "light";
};

import { cva } from "class-variance-authority";

const accordionVariants = cva("w-full", {
    variants: {
        variant: {
            container: "wby-gap-xs wby-flex wby-flex-col",
            underline: ""
        }
    }
});

const AccordionBase = ({
    children,
    variant,
    background = "base",
    className,
    ...baseRootProps
}: AccordionProps) => {
    const rootProps = useMemo(() => {
        const rootProps = { ...baseRootProps };
        if (rootProps.type !== "multiple") {
            // For single accordion, make it collapsible by default.
            rootProps.collapsible = rootProps.collapsible !== false;
        }
        return rootProps;
    }, [baseRootProps]);

    return (
        <AccordionRoot {...rootProps} className={accordionVariants({ variant, className })}>
            <AccordionContext.Provider value={{ variant, background }}>
                {children}
            </AccordionContext.Provider>
        </AccordionRoot>
    );
};

const DecoratableAccordion = makeDecoratable("Accordion", AccordionBase);

const Accordion = withStaticProps(DecoratableAccordion, {
    Item: AccordionItem
});

export { Accordion, type AccordionProps, type AccordionItemProps, useAccordion };
