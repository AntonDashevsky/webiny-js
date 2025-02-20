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
    icon,
    isActive,
    className,
    children
}: SidebarMenuSubButtonProps) => {
    const Comp = asChild ? Slot : "a";

    return (
        <Comp
            data-sidebar="menu-sub-button"
            data-size={size}
            data-active={isActive}
            className={cn(
                "wby-flex wby-w-full wby-text-md wby-text-neutral-primary wby-cursor-pointer wby-items-center wby-gap-sm wby-overflow-hidden wby-rounded-md wby-p-xs-plus wby-outline-none wby-ring-sidebar-ring hover:wby-bg-neutral-dimmed hover:!wby-no-underline focus-visible:wby-ring-2 active:wby-bg-sidebar-accent active:wby-text-sidebar-accent-foreground disabled:wby-pointer-events-none disabled:wby-opacity-50 aria-disabled:wby-pointer-events-none aria-disabled:wby-opacity-50 [&>span:last-child]:wby-truncate [&>svg]:wby-size-4 [&>svg]:wby-shrink-0 [&>svg]:wby-text-sidebar-accent-foreground",
                "data-[active=true]:wby-bg-sidebar-accent data-[active=true]:wby-text-sidebar-accent-foreground",
                "group-data-[collapsible=icon]:wby-hidden",
                className
            )}
        >
            {icon} {children}
        </Comp>
    );
};

export { SidebarMenuSubButton };
