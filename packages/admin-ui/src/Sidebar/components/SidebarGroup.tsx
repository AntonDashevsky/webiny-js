import React from "react";
import { cn } from "~/utils";

const SidebarGroup = React.forwardRef<HTMLDivElement, React.ComponentProps<"div">>(
    ({ className, ...props }, ref) => {
        return (
            <div
                ref={ref}
                data-sidebar="group"
                className={cn("wby-relative wby-flex wby-w-full wby-min-w-0 wby-flex-col wby-p-2", className)}
                {...props}
            />
        );
    }
);
SidebarGroup.displayName = "SidebarGroup";

export { SidebarGroup };