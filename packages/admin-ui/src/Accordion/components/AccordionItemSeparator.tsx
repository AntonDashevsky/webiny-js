import * as React from "react";
import { makeDecoratable } from "~/utils.js";
import { Separator, type SeparatorProps } from "~/Separator/index.js";

type AccordionItemSeparatorProps = SeparatorProps;

const AccordionItemSeparatorBase = (props: AccordionItemSeparatorProps) => {
    return <Separator orientation={"vertical"} className={"wby-h-lg wby-mx-sm-plus"} {...props} />;
};

export const AccordionItemSeparator = makeDecoratable(
    "AccordionItemSeparator",
    AccordionItemSeparatorBase
);
