import * as React from "react";
import { makeDecoratable, withStaticProps } from "~/utils";
import { IconButton, IconButtonProps as IconButtonProps } from "~/Button";
import { AccordionItemSeparator } from "./AccordionItemSeparator";

type AccordionItemActionProps = IconButtonProps;

const AccordionItemActionBase = (props : AccordionItemActionProps) => {
    return (
        <IconButton
            variant={"ghost"}
            size={"sm"}
            {...props}
        />
    );
};

export const DecoratableAccordionItemAction = makeDecoratable(
    "AccordionItemAction",
    AccordionItemActionBase
);

export const AccordionItemAction = withStaticProps(DecoratableAccordionItemAction, {
    Separator: AccordionItemSeparator
});
