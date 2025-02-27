import React from "react";
import { cn, cva, type VariantProps } from "~/utils";

const variants = cva(
    [
        "wby-peer/menu-button wby-flex wby-w-full wby-items-center wby-gap-sm wby-rounded-md wby-text-neutral-primary wby-px-sm",
        "wby-py-xs-plus wby-text-left wby-text-md wby-outline-none wby-ring-sidebar-ring wby-transition-[width,height,padding]",
        "wby-whitespace-nowrap",
        "wby-overflow-hidden",
        "hover:wby-bg-neutral-dimmed hover:!wby-no-underline",
        "focus-visible:wby-bg-neutral-dimmed",
        "data-[variant=group-label]:wby-opacity-30",
        "data-[active=true]:wby-bg-neutral-dimmed data-[active=true]:wby-pointer-events-none",
        "disabled:wby-pointer-events-none disabled:wby-text-neutral-disabled",
        "aria-disabled:wby-pointer-events-none disabled:wby-text-neutral-disabled",
        "[&>span:last-child]:wby-truncate [&>svg]:wby-shrink-0"
    ],
    {
        variants: {
            variant: {
                "group-label": "wby-uppercase"
            }
        }
    }
);

interface SidebarMenuButtonProps
    extends React.ComponentProps<"button">,
        VariantProps<typeof variants> {
    active?: boolean;
    icon?: React.ReactNode;
}

const SidebarMenuButton = ({
    variant,
    active,
    icon,
    className,
    children,
    ...props
}: SidebarMenuButtonProps) => {
    return (
        <button
            data-sidebar="menu-button"
            data-active={active}
            tabIndex={variant === "group-label" ? -1 : undefined}
            className={cn(variants({ variant }), className)}
            {...props}
        >
            {icon} {children}
        </button>
    );
};

export { SidebarMenuButton };
