import * as React from "react";
import { cn, makeDecoratable, withStaticProps } from "~/utils";
import { AccordionRoot } from "./components/AccordionRoot";
import { AccordionContext, useAccordion } from "./components/AccordionContext";
import { AccordionItem, AccordionItemProps } from "./components/AccordionItem";

type AccordionProps = React.ComponentPropsWithoutRef<typeof AccordionRoot> & {
    children: React.ReactNode;
    variant?: "underline" | "container";
    background?: "transparent" | "base" | "light";
};

const AccordionBase = ({
    children,
    variant,
    background = "base",
    ...rootProps
}: AccordionProps) => {
    return (
        <AccordionRoot
            className={cn("w-full", {
                "wby-gap-xs wby-flex wby-flex-col": variant === "container"
            })}
            {...rootProps}
        >
            <AccordionContext.Provider value={{ variant, background }}>
                {children}
            </AccordionContext.Provider>
        </AccordionRoot>
    );
};

AccordionBase.displayName = "Accordion";

const DecoratableAccordion = makeDecoratable("Accordion", AccordionBase);

const Accordion = withStaticProps(DecoratableAccordion, {
    Item: AccordionItem
});

export { Accordion, type AccordionProps, type AccordionItemProps, useAccordion };
