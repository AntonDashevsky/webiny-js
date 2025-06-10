import React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import { cn } from "~/utils";

type ProgressRootProps = ProgressPrimitive.ProgressProps;

const ProgressRoot = ({ className, ...props }: ProgressRootProps) => {
    return (
        <ProgressPrimitive.Root
            data-slot="progress"
            className={cn(
                "wby-bg-neutral-muted wby-relative wby-h-xs-plus wby-w-full wby-overflow-hidden wby-rounded-full",
                className
            )}
            {...props}
        />
    );
};

export { ProgressRoot, type ProgressRootProps };
