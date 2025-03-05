import React from "react";
import { cn } from "~/utils";

const SidebarMenuSub = ({ className, ...props }: React.ComponentProps<"ul">) => (
    <ul
        data-sidebar="menu-sub"
        className={cn(
            "wby-flex wby-min-w-0 wby-flex-col wby-gap-y-xs wby-pt-xs",
            "group-data-[state=collapsed]:wby-hidden",
            className
        )}
        {...props}
    />
);

export { SidebarMenuSub };
