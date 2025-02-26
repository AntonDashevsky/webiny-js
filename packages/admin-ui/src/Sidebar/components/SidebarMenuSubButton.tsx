import React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "~/utils";

interface SidebarMenuSubButtonProps extends React.ComponentProps<"a"> {
    asChild?: boolean;
    isActive?: boolean;
    icon?: React.ReactNode;
}

const SidebarMenuSubButton = ({
    asChild = false,
    icon,
    isActive,
    className,
    children,
    ...props
}: SidebarMenuSubButtonProps) => {
    const Comp = asChild ? Slot : "button";

    return (
        <Comp
            data-sidebar="menu-sub-button"
            data-active={isActive}
            className={cn(
                "wby-flex wby-w-full wby-text-md wby-text-neutral-primary wby-cursor-pointer wby-items-center wby-gap-sm",
                "wby-rounded-md wby-p-xs-plus wby-pr-sm wby-outline-none",
                "wby-h-xl wby-whitespace-nowrap",
                "wby-overflow-hidden",
                "hover:wby-bg-neutral-dimmed hover:!wby-no-underline",
                "focus-visible:wby-ring-2",
                "disabled:wby-pointer-events-none disabled:wby-opacity-50",
                "aria-disabled:wby-pointer-events-none aria-disabled:wby-opacity-50",
                "[&>span]:wby-truncate [&>svg]:wby-shrink-0 [&>svg]:wby-text-sidebar-accent-foreground",
                "data-[active=true]:wby-bg-sidebar-accent data-[active=true]:wby-text-sidebar-accent-foreground",
                "group-data-[collapsible=icon]:wby-hidden",
                className
            )}
            {...props}
        >
            {icon} {children}
        </Comp>
    );
};

export { SidebarMenuSubButton };
