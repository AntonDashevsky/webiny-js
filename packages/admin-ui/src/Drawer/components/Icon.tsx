import * as React from "react";
import { cn, makeDecoratable } from "~/utils";
import type { IconProps as IconComponentProps } from "~/Icon";
import { Icon as IconComponent } from "~/Icon";

type IconProps = IconComponentProps;

const IconBase = ({ className, ...props }: IconProps) => {
    return (
        <IconComponent
            size={"lg"}
            color={"neutral-strong"}
            {...props}
            className={cn("wby-pt-xs", className)}
        />
    );
};

export const Icon = makeDecoratable("Icon", IconBase);
