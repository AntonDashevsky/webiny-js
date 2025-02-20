import React from "react";
import { cn } from "~/utils";

const SidebarMenu = React.forwardRef<HTMLUListElement, React.ComponentProps<"ul">>(
    ({ className, ...props }, ref) => (
        <ul
            ref={ref}
            data-sidebar="menu"
            className={cn("wby-flex wby-w-full wby-min-w-0 wby-flex-col wby-gap-y-xs", className)}
            {...props}
        />
    )
);
SidebarMenu.displayName = "SidebarMenu";

export { SidebarMenu };