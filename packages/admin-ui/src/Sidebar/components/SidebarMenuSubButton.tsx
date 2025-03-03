import React, { useMemo } from "react";
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
        "[&>span:last-child]:wby-truncate [&>svg]:wby-shrink-0",
        "group-data-[collapsible=icon]:wby-hidden"
    ],
    {
        variants: {
            variant: {
                "group-label":
                    "wby-uppercase wby-font-semibold wby-text-neutral-muted wby-text-sm wby-pt-md wby-pb-xs-plus wby-pointer-events-none"
            },
            disabled: {
                true: "wby-pointer-events-none wby-text-neutral-disabled"
            }
        }
    }
);

interface SidebarMenuSubButtonProps
    extends React.ComponentProps<"div">,
        VariantProps<typeof variants> {
    variant?: "group-label";
    disabled?: boolean;
    active?: boolean;
    icon?: React.ReactNode;
}

const SidebarMenuSubButton = ({
    variant,
    icon,
    active,
    disabled,
    className,
    children,
    ...props
}: SidebarMenuSubButtonProps) => {
    // The following three attributes are required for the trigger to act as a button.
    // We can't use the default button element here because the content of the button
    // can also contain a button, which is not allowed in HTML.
    const divAsButtonProps = useMemo<React.HTMLAttributes<HTMLDivElement>>(() => {
        let tabIndex = 0;
        if (variant === "group-label" || disabled) {
            tabIndex = -1;
        }

        return {
            role: "button",
            tabIndex: tabIndex,
            onKeyDown: e => {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    e.currentTarget.click();
                }
            }
        };
    }, [variant, disabled]);

    return (
        <div
            data-sidebar="menu-sub-button"
            data-active={active}
            className={cn(variants({ variant, disabled }), className)}
            {...props}
            {...divAsButtonProps}
        >
            {icon} {children}
        </div>
    );
};

export { SidebarMenuSubButton };
