import React, { useMemo } from "react";
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
        "data-[active=true]:wby-bg-neutral-dimmed data-[active=true]:wby-font-semibold data-[active=true]:wby-pointer-events-none",
        "[&>span:last-child]:wby-truncate [&>svg]:wby-shrink-0"
    ],
    {
        variants: {
            variant: {
                "group-label": "wby-uppercase"
            },
            disabled: {
                true: "wby-pointer-events-none wby-text-neutral-disabled"
            }
        }
    }
);

interface SidebarMenuButtonProps
    extends React.ComponentProps<"div">,
        VariantProps<typeof variants> {
    active?: boolean;
    disabled?: boolean;
    icon?: React.ReactNode;
    action?: React.ReactNode;
}

const SidebarMenuButton = ({
    variant,
    active,
    disabled,
    icon,
    action,
    className,
    children,
    ...props
}: SidebarMenuButtonProps) => {
    // The following three attributes are required for the trigger to act as a button.
    // We can't use the default button element here because the content of the trigger
    // can also contain one or more buttons.
    const divAsButtonProps = useMemo<React.HTMLAttributes<HTMLDivElement>>(() => {
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
    }, [variant, disabled]);

    return (
        <div
            data-sidebar="menu-button"
            data-active={active}
            className={cn(variants({ variant, disabled }), className)}
            {...props}
            {...divAsButtonProps}
        >
            {icon} {children} {action}
        </div>
    );
};

export { SidebarMenuButton };
