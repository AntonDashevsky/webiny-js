import React from "react";
import { cn } from "~/utils";


// React.ComponentProps<"li">
const SidebarMenuItem = React.forwardRef<HTMLLIElement, any>(
    ({ className, ...props }, ref) => (
        <li
            ref={ref}
            data-sidebar="menu-item"
            className={cn("wby-group/menu-item wby-relative", className)}
            {...props}
        >
            {props.content}
        </li>
    )
);
SidebarMenuItem.displayName = "SidebarMenuItem";

export { SidebarMenuItem };