import * as React from "react";
import { makeDecoratable, withStaticProps } from "~/utils";
import { AccordionRoot } from "./components/AccordionRoot";
import { AccordionItem, AccordionItemProps } from "./components/AccordionItem";

type AccordionProps = React.ComponentPropsWithoutRef<typeof AccordionRoot> & {
    children: React.ReactNode;
    variant?: "underline" | "container";
    background?: "default" | "withDescriptions";
};

const AccordionBase = ({ children, ...rootProps }: AccordionProps) => {
    return (
        <AccordionRoot className={"w-full"} {...rootProps}>
            {children}
        </AccordionRoot>
    );
};

AccordionBase.displayName = "Accordion";

const DecoratableAccordion = makeDecoratable("Accordion", AccordionBase);

const Accordion = withStaticProps(DecoratableAccordion, {
    Item: AccordionItem
});

export { Accordion, type AccordionProps, type AccordionItemProps };
