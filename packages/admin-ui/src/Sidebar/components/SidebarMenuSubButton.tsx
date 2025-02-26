import React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "~/utils";

interface SidebarMenuSubButtonProps extends React.ComponentProps<"button"> {
    asChild?: boolean;
    active?: boolean;
    icon?: React.ReactNode;
}

const SidebarMenuSubButton = ({
    asChild = false,
    icon,
    active,
    className,
    children,
    ...props
}: SidebarMenuSubButtonProps) => {
    const Comp = asChild ? Slot : "button";

    return (
        <Comp
            data-sidebar="menu-sub-button"
            data-active={active}
            className={cn(
                "wby-flex wby-w-full wby-text-md wby-text-neutral-primary wby-cursor-pointer wby-items-center wby-gap-sm",
                "wby-rounded-md wby-p-xs-plus wby-pr-sm wby-outline-none",
                "wby-h-xl wby-whitespace-nowrap",
                "wby-overflow-hidden",
                "hover:wby-bg-neutral-dimmed hover:!wby-no-underline",
                "focus-visible:wby-bg-neutral-dimmed",
                "data-[active=true]:wby-bg-neutral-dimmed data-[active=true]:wby-font-semibold data-[active=true]:wby-pointer-events-none",
                "disabled:wby-pointer-events-none disabled:wby-text-neutral-disabled",
                "aria-disabled:wby-pointer-events-none disabled:wby-text-neutral-disabled",
                "[&>span:last-child]:wby-truncate [&>svg]:wby-shrink-0",
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
