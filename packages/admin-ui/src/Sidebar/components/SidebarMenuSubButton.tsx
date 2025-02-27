import React from "react";
import { cn, cva, type VariantProps } from "~/utils";

const variants = cva(
    [
        "wby-flex wby-w-full wby-text-md wby-text-neutral-primary wby-cursor-pointer wby-items-center wby-gap-sm",
        "wby-rounded-md wby-p-xs-plus wby-pr-sm wby-outline-none",
        "wby-whitespace-nowrap",
        "wby-overflow-hidden",
        "hover:wby-bg-neutral-dimmed hover:!wby-no-underline",
        "focus-visible:wby-bg-neutral-dimmed",
        "data-[active=true]:wby-bg-neutral-dimmed data-[active=true]:wby-font-semibold data-[active=true]:wby-pointer-events-none",
        "disabled:wby-pointer-events-none disabled:wby-text-neutral-disabled",
        "aria-disabled:wby-pointer-events-none disabled:wby-text-neutral-disabled",
        "[&>span:last-child]:wby-truncate [&>svg]:wby-shrink-0",
        "group-data-[collapsible=icon]:wby-hidden"
    ],
    {
        variants: {
            variant: {
                "group-label":
                    "wby-uppercase wby-font-semibold wby-text-neutral-muted wby-text-sm wby-pt-md wby-pb-xs-plus wby-pointer-events-none"
            }
        }
    }
);

interface SidebarMenuSubButtonProps
    extends React.ComponentProps<"button">,
        VariantProps<typeof variants> {
    variant?: "group-label";
    active?: boolean;
    icon?: React.ReactNode;
}

const SidebarMenuSubButton = ({
    variant,
    icon,
    active,
    className,
    children,
    ...props
}: SidebarMenuSubButtonProps) => {
    return (
        <button
            data-sidebar="menu-sub-button"
            data-active={active}
            tabIndex={variant === "group-label" ? -1 : undefined}
            className={cn(variants({ variant }), className)}
            {...props}
        >
            {icon} {children}
        </button>
    );
};

export { SidebarMenuSubButton };
