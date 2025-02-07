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

const AccordionBase = ({
    children,
    variant,
    background = "base",
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
        <AccordionRoot
            {...rootProps}
            className={cn(
                "w-full",
                { "wby-gap-xs wby-flex wby-flex-col": variant === "container" },
                rootProps.className
            )}
        >
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
