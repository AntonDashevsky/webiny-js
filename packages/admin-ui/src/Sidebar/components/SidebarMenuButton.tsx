import React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "~/utils";

interface SidebarMenuButtonProps extends React.ComponentProps<"button"> {
    asChild?: boolean;
    active?: boolean;
    icon?: React.ReactNode;
}

const SidebarMenuButton = ({
    asChild = false,
    icon,
    active,
    className,
    children,
    ...props
}: SidebarMenuButtonProps) => {
    const Comp = asChild ? Slot : "button";

    return (
        <Comp
            data-sidebar="menu-button"
            data-active={active}
            className={cn(
                "wby-peer/menu-button wby-flex wby-w-full wby-items-center wby-gap-sm wby-rounded-md wby-text-neutral-primary wby-px-sm",
                "wby-py-xs-plus wby-text-left wby-text-md wby-outline-none wby-ring-sidebar-ring wby-transition-[width,height,padding]",
                "wby-h-xl wby-whitespace-nowrap",
                "wby-overflow-hidden",
                "hover:wby-bg-neutral-dimmed hover:!wby-no-underline",
                "focus-visible:wby-bg-neutral-dimmed",
                "data-[active=true]:wby-bg-neutral-dimmed data-[active=true]:wby-font-semibold data-[active=true]:wby-pointer-events-none",
                "disabled:wby-pointer-events-none disabled:wby-text-neutral-disabled",
                "aria-disabled:wby-pointer-events-none disabled:wby-text-neutral-disabled",
                "group-data-[state=open]/collapsible:wby-font-semibold group-data-[state=open]/collapsible:[&>svg]:wby-fill-neutral-xstrong",
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
