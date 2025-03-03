import React, { useMemo } from "react";
import { cva } from "~/utils";
import type { SidebarMenuItemProps } from "~/Sidebar/components/SidebarMenuItem";
import { Link } from "@webiny/react-router";

const variants = cva(
    [
        "wby-flex wby-w-full wby-cursor-pointer wby-items-center wby-gap-sm",
        "wby-text-md wby-text-neutral-primary !wby-no-underline",
        "wby-rounded-md wby-p-xs-plus wby-pr-sm wby-outline-none",
        "wby-whitespace-nowrap wby-overflow-hidden",
        "hover:wby-bg-neutral-dimmed",
        "focus:wby-bg-neutral-dimmed focus:wby-ring-none focus:wby-ring-transparent",
        "data-[active=true]:wby-bg-neutral-dimmed data-[active=true]:wby-font-semibold data-[active=true]:wby-pointer-events-none",
        "group-data-[state=collapsed]:wby-hidden"
    ],
    {
        variants: {
            variant: {
                "group-label": [
                    "wby-uppercase wby-font-semibold wby-text-neutral-muted wby-text-sm ",
                    "wby-pt-md wby-pb-xs-plus wby-pointer-events-none"
                ]
            },
            disabled: {
                true: "wby-pointer-events-none wby-text-neutral-disabled"
            }
        }
    }
);

type SidebarMenuSubButtonProps = Omit<SidebarMenuItemProps, "className">;

const SidebarMenuSubButton = ({
    onClick,
    variant,
    active,
    disabled,
    icon,
    action,
    children,
    to,
    ...maybeLinkProps
}: SidebarMenuSubButtonProps) => {
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
            {icon} {children} {action}
        </div>
    );
};

export { SidebarMenuSubButton };
