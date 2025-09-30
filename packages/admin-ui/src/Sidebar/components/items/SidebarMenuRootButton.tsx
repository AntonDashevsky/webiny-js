import React from "react";
import { cn, cva } from "~/utils.js";
import { SimpleLink } from "@webiny/app";
import type { SidebarMenuItemProps } from "./SidebarMenuRootItem.js";
import { DivButton } from "./DivButton.js";

const variants = cva(
    [
        "wby-flex wby-w-full wby-items-center wby-gap-sm wby-rounded-md",
        "!wby-no-underline wby-text-neutral-primary wby-cursor-pointer wby-px-sm wby-py-xs-plus wby-text-left",
        "wby-text-md wby-outline-none wby-transition-[width,height,padding]",
        "wby-whitespace-nowrap wby-overflow-hidden",
        "hover:wby-bg-neutral-dark/5",
        "focus:wby-bg-neutral-dark/5 focus:wby-ring-none focus:wby-ring-transparent",
        "data-[active=true]:wby-bg-neutral-dark/5 data-[active=true]:wby-font-semibold data-[active=true]:wby-pointer-events-none",
        "group-data-[state=open]/menu-item-collapsible:!wby-font-semibold"
    ],
    {
        variants: {
            variant: {
                "group-label": "!wby-text-neutral-muted wby-uppercase"
            },
            disabled: {
                true: "wby-pointer-events-none !wby-text-neutral-disabled"
            }
        }
    }
);

type SidebarMenuButtonBaseProps = Omit<SidebarMenuItemProps, "children">;

const SidebarMenuRootButton = ({
    className,
    onClick,
    variant,
    active,
    disabled,
    icon,
    action,
    text,
    to,
    ...linkProps
}: SidebarMenuButtonBaseProps) => {
    const sharedProps = {
        "data-sidebar": "menu-button",
        "data-active": active,
        className: variants({ variant, disabled }),
        onClick
    };

    const chevron = action ? (
        <div className="wby-flex wby-absolute wby-right-sm-plus">{action}</div>
    ) : null;

    const content = to ? (
        <SimpleLink {...sharedProps} to={to} {...linkProps}>
            {icon}
            {text}
            {chevron}
        </SimpleLink>
    ) : (
        <DivButton
            {...sharedProps}
            disabled={disabled}
            tabIndex={variant === "group-label" ? -1 : undefined}
        >
            {icon}
            {text}
            {chevron}
        </DivButton>
    );

    return <div className={cn("wby-flex wby-items-center wby-w-full", className)}>{content}</div>;
};

export { SidebarMenuRootButton };
