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
                "wby-peer/menu-button wby-flex wby-w-full wby-items-center wby-gap-sm wby-overflow-hidden wby-rounded-md wby-text-neutral-primary wby-px-sm wby-py-xs-plus wby-text-left wby-text-md wby-outline-none wby-ring-sidebar-ring wby-transition-[width,height,padding] hover:wby-bg-neutral-dimmed hover:!wby-no-underline focus-visible:wby-ring-2 active:wby-bg-sidebar-accent active:wby-text-sidebar-accent-foreground disabled:wby-pointer-events-none disabled:wby-opacity-50 group-data-[state=open]/collapsible:wby-font-semibold group-data-[state=open]/collapsible:[&>svg]:wby-fill-neutral-xstrong group--has-[[data-sidebar=menu-action]]/menu-item:wby-pr-8 aria-disabled:wby-pointer-events-none aria-disabled:wby-opacity-50 data-[active=true]:wby-bg-sidebar-accent data-[active=true]:wby-font-medium data-[active=true]:wby-text-sidebar-accent-foreground data-[state=open]:hover:wby-bg-sidebar-accent data-[state=open]:hover:wby-text-sidebar-accent-foreground group--data-[collapsible=icon]:!wby-size-8 group--data-[collapsible=icon]:!wby-p-2 [&>span:last-child]:wby-truncate [&>svg]:wby-shrink-0",
                className
            )}
            {...props}
        >
            {icon} {children}
        </Comp>
    );
};

export { SidebarMenuButton };
