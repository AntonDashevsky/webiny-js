import * as React from "react";
import type { IconProps as IconComponentProps } from "~/Icon";
import { Icon as IconComponent } from "~/Icon";
import { makeDecoratable } from "~/utils";

type IconProps = IconComponentProps;

const IconBase = (props: IconProps) => {
    return <IconComponent size={"md"} color={"neutral-strong"} {...props} />;
};

export const Icon = makeDecoratable("Icon", IconBase);
