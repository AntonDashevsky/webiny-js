import * as React from "react";
import { makeDecoratable } from "~/utils";
import { Separator, type SeparatorProps } from "~/Separator";

type AccordionItemSeparatorProps = SeparatorProps;

const AccordionItemSeparatorBase = (props: AccordionItemSeparatorProps) => {
    return <Separator variant={"dimmed"} orientation={"vertical"} {...props} />;
};

export const AccordionItemSeparator = makeDecoratable(
    "AccordionItemSeparator",
    AccordionItemSeparatorBase
);
