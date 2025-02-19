import React from "react";
import { cn } from "~/utils";

const SidebarMenuSub = ({ className, ...props }: React.ComponentProps<"ul">) => (
    <ul
        data-sidebar="menu-sub"
        className={cn(
            "wby-mx-3.5 wby-flex wby-min-w-0 wby-translate-x-px wby-flex-col wby-gap-1 wby-border-l wby-border-sidebar-border wby-px-2.5 wby-py-0.5",
            "group-data-[collapsible=icon]:wby-hidden",
            className
        )}
        {...props}
    />
);

export { SidebarMenuSub };
