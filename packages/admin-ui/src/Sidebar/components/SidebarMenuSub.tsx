import React from "react";
import { cn } from "~/utils";

const SidebarMenuSub = ({ className, ...props }: React.ComponentProps<"ul">) => (
    <ul
        data-sidebar="menu-sub"
        className={cn(
            "wby-flex wby-min-w-0 wby-translate-x-px wby-flex-col wby-pl-md wby-gap-y-sm wby-pt-sm",
            "group-data-[collapsible=icon]:wby-hidden",
            className
        )}
        {...props}
    />
);

export { SidebarMenuSub };
