import React, { useMemo } from "react";
import { cva } from "~/utils";
import { Link } from "@webiny/react-router";
import type { SidebarMenuItemProps } from "~/Sidebar/components/SidebarMenuItem";

const variants = cva(
    [
        "wby-peer/menu-button wby-flex wby-w-full wby-items-center wby-gap-sm wby-rounded-md",
        "!wby-no-underline wby-text-neutral-primary wby-cursor-pointer wby-px-sm wby-py-xs-plus wby-text-left",
        "wby-text-md wby-outline-none wby-transition-[width,height,padding]",
        "wby-whitespace-nowrap wby-overflow-hidden",
        "hover:wby-bg-neutral-dimmed",
        "focus:wby-bg-neutral-dimmed focus:wby-ring-none focus:wby-ring-transparent",
        "data-[active=true]:wby-bg-neutral-dimmed data-[active=true]:wby-font-semibold data-[active=true]:wby-pointer-events-none",
        "[&>span:last-child]:wby-truncate [&>svg]:wby-shrink-0"
    ],
    {
        variants: {
            variant: {
                "group-label": "wby-text-neutral-muted wby-uppercase"
            },
            disabled: {
                true: "wby-pointer-events-none wby-text-neutral-disabled"
            }
        }
    }
);

type SidebarMenuButtonBaseProps = Omit<SidebarMenuItemProps, "className">;

const SidebarMenuButton = ({
    onClick,
    variant,
    active,
    disabled,
    icon,
    action,
    children,
    to,
    ...maybeLinkProps
}: SidebarMenuButtonBaseProps) => {
    const sharedProps = {
        "data-sidebar": "menu-button",
        "data-active": active,
        className: variants({ variant, disabled }),
        onClick
    };

    // The following three attributes are required for the trigger to act as a button.
    // We can't use the default button element here because the content of the button
    // can also contain a button, which is not allowed in HTML.
    const divAsButtonProps = useMemo<React.HTMLAttributes<HTMLDivElement>>(() => {
        if (!to) {
            return {};
        }

        let tabIndex = 0;
        if (variant === "group-label" || disabled) {
            tabIndex = -1;
        }

        return {
            role: "button",
            tabIndex,
            onKeyDown: e => {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    e.currentTarget.click();
                }
            }
        };
    }, [to, variant, disabled]);

    if (to) {
        return (
            <Link {...sharedProps} {...maybeLinkProps} to={to}>
                {icon} {children} {action}
            </Link>
        );
    }

    return (
        <div {...sharedProps} {...divAsButtonProps}>
            {icon} {children}
        </div>
    );
};

export { SidebarMenuButton };
