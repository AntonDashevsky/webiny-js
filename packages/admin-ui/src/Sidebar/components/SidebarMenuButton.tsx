import React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "~/utils";

type SidebarMenuButtonProps = React.ComponentProps<"button"> & {
    asChild?: boolean;
    isActive?: boolean;
    icon?: React.ReactNode;
};

const SidebarMenuButton = ({
    asChild = false,
    isActive = false,
    icon,
    children,
    className,
    ...props
}: SidebarMenuButtonProps) => {
    const Comp = asChild ? Slot : "button";

    return (
        <Comp
            data-sidebar="menu-button"
            data-active={isActive}
            className={cn(
                "wby-peer/menu-button wby-flex wby-w-full wby-items-center wby-gap-sm wby-rounded-md wby-text-neutral-primary wby-px-sm",
                "wby-py-xs-plus wby-text-left wby-text-md wby-outline-none wby-ring-sidebar-ring wby-transition-[width,height,padding]",
                "wby-h-xl wby-whitespace-nowrap",
                "wby-overflow-hidden",
                "hover:wby-bg-neutral-dimmed hover:!wby-no-underline",
                "disabled:wby-pointer-events-none disabled:wby-opacity-50",
                "group-data-[state=open]/collapsible:wby-font-semibold group-data-[state=open]/collapsible:[&>svg]:wby-fill-neutral-xstrong",
                "group--has-[[data-sidebar=menu-action]]/menu-item:wby-pr-8",
                "aria-disabled:wby-pointer-events-none aria-disabled:wby-opacity-50",
                "[&>span:last-child]:wby-truncate [&>svg]:wby-shrink-0",
                className
            )}
            {...props}
        >
            {icon} {children}
        </Comp>
    );
};

export { SidebarMenuButton };
