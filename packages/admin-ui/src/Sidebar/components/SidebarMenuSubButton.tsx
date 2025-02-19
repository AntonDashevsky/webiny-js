import React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "~/utils";

interface SidebarMenuSubButtonProps extends React.ComponentProps<"a"> {
    asChild?: boolean;
    size?: "sm" | "md";
    isActive?: boolean;
    icon?: React.ReactNode;
}

const SidebarMenuSubButton = ({
    asChild = false,
    size = "md",
    isActive,
    className,
    ...props
}: SidebarMenuSubButtonProps) => {
    const Comp = asChild ? Slot : "a";

    return (
        <Comp
            data-sidebar="menu-sub-button"
            data-size={size}
            data-active={isActive}
            className={cn(
                "wby-flex wby-translate-x-px wby-items-center wby-gap-2 wby-overflow-hidden wby-rounded-md wby-px-23 wby-outline-none wby-ring-sidebar-ring hover:wby-bg-sidebar-accent hover:wby-text-sidebar-accent-foreground focus-visible:wby-ring-2 active:wby-bg-sidebar-accent active:wby-text-sidebar-accent-foreground disabled:wby-pointer-events-none disabled:wby-opacity-50 aria-disabled:wby-pointer-events-none aria-disabled:wby-opacity-50 [&>span:last-child]:wby-truncate [&>svg]:wby-size-4 [&>svg]:wby-shrink-0 [&>svg]:wby-text-sidebar-accent-foreground",
                "data-[active=true]:wby-bg-sidebar-accent data-[active=true]:wby-text-sidebar-accent-foreground",
                size === "sm" && "wby-text-xs",
                size === "md" && "wby-text-sm",
                "group-data-[collapsible=icon]:wby-hidden",
                className
            )}
            {...props}
        />
    );
};
SidebarMenuSubButton.displayName = "SidebarMenuSubButton";

export { SidebarMenuSubButton };
