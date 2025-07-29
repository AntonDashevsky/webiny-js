import * as React from "react";
import { makeDecoratable } from "~/utils";
import type { IconProps as IconComponentProps } from "~/Icon";
import { Icon as IconComponent } from "~/Icon";

type AccordionItemIconProps = IconComponentProps;

const AccordionItemIconBase = (props: AccordionItemIconProps) => {
    return <IconComponent size={"md"} color={"neutral-strong"} {...props} />;
};

export const AccordionItemIcon = makeDecoratable("AccordionItemIcon", AccordionItemIconBase);
